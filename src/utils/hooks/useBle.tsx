import {useState} from 'react';
import {Alert, PermissionsAndroid, Platform} from 'react-native';
import {BleManager, Device} from 'react-native-ble-plx';

const useBle = () => {
  const bleManager = new BleManager();
  const [allDevices, setAllDevices] = useState<Device[]>([]);

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
        }
      }, true);
    } else {
      Alert.alert('Permission Denied');
    }
  };

  return {
    initializeBluetooth,
    allDevices,
  };
};

export default useBle;
