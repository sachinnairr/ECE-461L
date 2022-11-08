N = 13
D = -1

def encrypt(inputText):
    inputList = list(inputText)
    inputList.reverse()
    encryptedText = ""

    for i in inputList:
        encryptedText = encryptedText + shift(i, D)
    return encryptedText

def decrypt(inputText):
    inputList = list(inputText)
    inputList.reverse()
    decryptedText = ""

    for i in inputList:
        decryptedText = decryptedText + shift(i, -D)
    return decryptedText

# Shifts a character by N in direction D
def shift(input, direction):
    shifted = input
    n = N
    if (direction < 0):
        n = N * -1
    shifted = chr((ord(input) - 34 + (n % 93) + 93) % 93 + 34)
    return shifted

if __name__ == '__main__':
    print("Hello!")
    password = "password123"
    encrypted_password = encrypt(password)
    print(encrypted_password)
    decrypted_password = decrypt(encrypted_password)
    print(decrypted_password)
