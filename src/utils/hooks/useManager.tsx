import {useState} from 'react';
import {
  NativeEventEmitter,
  NativeModules,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import BleManager from 'react-native-ble-manager';
import {Device} from 'react-native-ble-plx';

const useManager = () => {
  const BleManagerModule = NativeModules.BleManager;
  const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);
  const [allDevices, setAllDevices] = useState<Device[]>([]);
  const SERVICE_UUID = '6E400001-B5A3-F393-E0A9-E50E24DCCA9E';
  const CHARACTERISTIC_UUID = '6E400002-B5A3-F393-E0A9-E50E24DCCA9E';

  const requestBluetoothPermissions = async () => {
    if (Platform.OS === 'android') {
      if (Platform.Version >= 31) {
        // Android 12 and above
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        ]);

        if (
          granted['android.permission.BLUETOOTH_SCAN'] !==
            PermissionsAndroid.RESULTS.GRANTED ||
          granted['android.permission.BLUETOOTH_CONNECT'] !==
            PermissionsAndroid.RESULTS.GRANTED ||
          granted['android.permission.ACCESS_FINE_LOCATION'] !==
            PermissionsAndroid.RESULTS.GRANTED
        ) {
          console.log('BLE permissions not granted');
          return false;
        }
      } else {
        // Android 6 to 11
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        ]);

        if (
          granted['android.permission.ACCESS_FINE_LOCATION'] !==
          PermissionsAndroid.RESULTS.GRANTED
        ) {
          console.log('BLE permissions not granted');
          return false;
        }
      }
      return true;
    }
    return false;
  };

  const handleDiscoverPeripheral = (device: Device) => {
    if (device && device?.id && device.name?.includes('Doloco')) {
      setAllDevices(prevDevices => {
        if (!prevDevices.some(d => d.id === device.id)) {
          return [...prevDevices, device];
        }
        return prevDevices;
      });
    }
  };

  const startScanning = async () => {
    const permissionsGranted = await requestBluetoothPermissions();
    if (!permissionsGranted) {
      console.log('Bluetooth permissions not granted');
      return;
    }

    BleManager.start({showAlert: false}).then(() => {
      bleManagerEmitter.addListener(
        'BleManagerDiscoverPeripheral',
        handleDiscoverPeripheral,
      );
      setAllDevices([]);

      BleManager.scan([], 10, true)
      .catch(err => {
        console.error(err);
      });

      setTimeout(() => {
        stopScanning();
      }, 5000);
    });
  };

  const stopScanning = () => {
    BleManager.stopScan()
      .then(() => {
        bleManagerEmitter.removeAllListeners('BleManagerDiscoverPeripheral');
      })
      .catch(err => {
        console.error(err);
      });
  };

  const connectToDevice = (
    deviceId: string,
    ssid: string,
    password: string,
  ) => {
    BleManager.connect(deviceId)
      .then(() => {
        return BleManager.retrieveServices(deviceId);
      })
      .then(() => {
        sendMessage(deviceId, ssid, password);
      })
      .catch(error => {
        console.log('Connection error', error);
      });
  };

  const sendMessage = async (
    deviceId: string,
    ssid: string,
    password: string,
  ) => {
    if (!deviceId) {
      console.log('No device connected');
      return;
    }

    const data = `${ssid},${password}`;

    try {
      await BleManager.writeWithoutResponse(
        deviceId,
        SERVICE_UUID,
        CHARACTERISTIC_UUID,
        stringToBytes(data),
      );
    } catch (error) {
      console.log('Write error', error);
    }
  };

  const stringToBytes = (str: string) => {
    return Array.from(new TextEncoder().encode(str));
  };

  return {
    startScanning,
    stopScanning,
    connectToDevice,
    sendMessage,
    allDevices,
  };
};

export default useManager;
