# setup adb wireless

adb kill-server
sleep 5
adb start-server
sleep 5
adb devices
sleep 5

adb usb
sleep 5
adb tcpip 5555
sleep 5
adb connect 192.168.29.177:5555
sleep 5
adb devices
