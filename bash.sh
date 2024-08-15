# setup adb wireless

adb kill-server
adb start-server
adb devices

adb usb
adb tcpip 5555
adb connect 192.168.29.177:5555
