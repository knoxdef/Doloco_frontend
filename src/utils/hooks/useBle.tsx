import {useState} from 'react';
import {Alert, PermissionsAndroid, Platform} from 'react-native';
import {BleManager, Device} from 'react-native-ble-plx';

const useBle = () => {
  const bleManager = new BleManager();
  const [allDevices, setAllDevices] = useState<Device[]>([]);
  const [connectedDevice, setConnectedDecive] = useState<Device | null>(null);

  const requestBluetoothPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'Bluetooth requires location permission',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );

      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } else if (Platform.OS === 'ios') {
      // const result = await request(PERMISSIONS.IOS.BLUETOOTH_PERIPHERAL);
      // return result === RESULTS.GRANTED;
    }
    return false;
  };

  const isDuplicateDevice = (devices: Device[], nextDevice: Device) => {
    return devices.some(device => nextDevice.id === device.id);
  };

  const startScanning = () => {
    setAllDevices([]); // Clear devices before starting scan
    bleManager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.error(error);
        return;
      }

      if (device && device?.id && device.name?.includes('Doloco')) {
        setAllDevices(prevDevices => {
          if (!isDuplicateDevice(prevDevices, device)) {
            return [...prevDevices, device];
          }
          return prevDevices;
        });
      }
    });

    // Stop scanning after 10 seconds
    setTimeout(() => {
      bleManager.stopDeviceScan();
    }, 10000);
  };

  const initializeBluetooth = async () => {
    const permissionGranted = await requestBluetoothPermission();
    if (permissionGranted) {
      bleManager.onStateChange(state => {
        if (state === 'PoweredOn') {
          startScanning();
        } else {
          Alert.alert('Bluetooth OFF');
          return;
        }
      }, true);
    } else {
      Alert.alert('Permission Denied');
    }
  };

  const connectToDevice = async (
    deviceId: string,
    ssid: string,
    password: string,
  ) => {
    try {
      console.log(deviceId);
      bleManager.connectToDevice(deviceId).then(async device => {
        setConnectedDecive(device);
        await device.discoverAllServicesAndCharacteristics();

        const services = await device.services();
        for (const service of services) {
          const characteristics = await service.characteristics();
          for (const characteristic of characteristics) {
            if (characteristic.isWritableWithoutResponse) {
              const data = `${ssid},${password}`;
              await characteristic.writeWithoutResponse(data);
              Alert.alert('Success', 'Your wifi credential successfuly sent');
              device.cancelConnection();
              setConnectedDecive(null);
              return;
            }
          }
        }
      });
    } catch (error) {
      console.log('Connection Error', error);
    }
  };

  return {
    initializeBluetooth,
    connectToDevice,
    connectedDevice,
    allDevices,
  };
};

export default useBle;
