import base64

from Crypto.Cipher import DES


def unpad(str):
    return str[:len(str) - ord(str[-1])]


def decriptDes(str):
    key = "79184391".encode("utf-8")
    iv = "87968842".encode("utf-8")
    cipher = DES.new(key, DES.MODE_CBC, iv)
    originalStr = base64.b64decode(str)
    originalByte = cipher.decrypt(originalStr)
    return unpad(originalByte.decode("utf-8"))


print(decriptDes("6Yg4mbXEMdjypNa3XpNaYXCtAxiUe+lccwSYbmOuB1wSw2ZybYDO+2iRDBxK3ky8DK1ju9SGUVaxRTPoxpRBUg=="))
