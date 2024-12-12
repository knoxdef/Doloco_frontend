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
  const WIFI_CHARACTERISTIC_UUID = '6E400002-B5A3-F393-E0A9-E50E24DCCA9E'; 

  const requestBluetoothPermissions = async () => {
    if (Platform.OS === 'android') { //check os
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

  const handleDiscoverPeripheral = (device: Device) => { //tanya device ada atau tidak
    if (device && device?.id && device.name?.includes('Doloco')) { //terkandung string doloco
      setAllDevices(prevDevices => { //prevdevice sudah dari library, digunakan untuk memanggil data yang sudah kesimpan
        if (!prevDevices.some(d => d.id === device.id)) { //kalau d.id sama dengan device.id akan ngebalikin true, tapi karena ada ! akan menjadi false
          return [...prevDevices, device]; //jika true akan menggabungkan semua data prevdevice dengan device dan menjadi all device
        }                                  //semua data akan di destructuring, artinya semua data dipecah dan digabungkan kembali menjadi 1 array bersama dengan device
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
      setAllDevices([]); //set all device untuk dibersihkan terlebih dahulu biar gk double
      bleManagerEmitter.addListener( //digunakan untuk mentrigger handleDiscoverPeripheral
        'BleManagerDiscoverPeripheral',
        handleDiscoverPeripheral,
      );

      BleManager.scan([], 10, false);

      setTimeout(() => {
        stopScanning();
      }, 5000);
    });
  };

  const checkBluetoothState = async () => { //cari bluetooth aktif atau enggak
    try {
      const state = await BleManager.checkState();
      return state;
    } catch (error) {
      console.log('error', error);
    }
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

  const startNotification = async (deviceId: string) => { //untuk memberitahu aplikasi bahwa dia sudah harus menerima notifikasi dari IoT
    try {
      await BleManager.startNotification(
        deviceId,
        SERVICE_UUID,
        WIFI_CHARACTERISTIC_UUID,
      );
      console.log('Subscribed to WiFi status characteristic');
    } catch (error) {
      console.error('Failed to subscribe:', error);
      throw error;
    }
  };

  const readNotification = async (deviceId: string) => { //membaca notifikasi yang dikirimkan dari IoT
    try {
      const data = await BleManager.read(
        deviceId,
        SERVICE_UUID,
        WIFI_CHARACTERISTIC_UUID,
      );
      const wifiStatus = data;
      return wifiStatus;
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const connectToDevice = async (deviceId: string) => {
    await BleManager.connect(deviceId).then(() => {
      return BleManager.retrieveServices(deviceId);
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
        WIFI_CHARACTERISTIC_UUID,
        stringToBytes(data),
      );
    } catch (error) {
      console.log('Write error', error);
    }
  };

  const disconnectBle = async (id: string) => {
    await BleManager.disconnect(id);
  };

  const stringToBytes = (str: string) => {  //untuk mengubah string yang dikirimkan ke IoT menjadi Bytes
    return Array.from(new TextEncoder().encode(str));
  };

  const findSpecificDeviceAndConnect = async (serial: string) => { // digunakan untuk set wifi pada IoT Profile
    await startScanning();

    await new Promise(resolve => setTimeout(resolve, 1000));

    for (const device of allDevices) { //dari parameter alldevice akan diambil 1 parameter
      try {
        if (device.name === serial) { //jika nama device(data dari hasil scan) sama dengan serial(dari aplikasi)
          await connectToDevice(device.id);
          return {id: device.id, name: device.name};
        }
      } catch (error) {
        console.log('Error:', error);
      }
    }
  };

  return {
    startScanning,
    stopScanning,
    connectToDevice,
    startNotification,
    readNotification,
    sendMessage,
    disconnectBle,
    checkBluetoothState,
    findSpecificDeviceAndConnect,
    allDevices,
  };
};

export default useManager;
