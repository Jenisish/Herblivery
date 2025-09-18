import qrcode

data = "PK009"
qr = qrcode.make(data)

qr.save("PK009_qr.png")
