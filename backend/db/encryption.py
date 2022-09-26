
# Encrypts the inputText
def customEncrypt(inputText, N, D):
    inputList = list(inputText)
    inputList.reverse()
    encryptedText = ""

    for i in inputList:
        encryptedText = encryptedText + shift(i, N, D)
    return encryptedText

# Shifts a character by N in direction D
def shift(input, N, D):
    shifted = input
    if (D < 0):
        N = N * -1
    shifted = chr((ord(input) - 34 + (N % 93) + 93) % 93 + 34)
    return shifted

# When input is valid, encrypts information user provides
def testCustomEncrypt():
    valid, idText, pwd, N, D = takeUserInputs()

    # Asks until user gives a valid input
    while(not valid):
        print("\nYour input was not valid. Please try again.")
        valid, idText, pwd, N, D = takeUserInputs()

    # Prints results
    userID = customEncrypt(idText, N, D)
    password = customEncrypt(pwd, N, D)
    print("\nEncrypyted userid: " + userID)
    print("Encrypted password: " + password)
    print("Original userID: " + idText)
    print("Original password: " + pwd)

# Prompt the user and test the validity of inputs
def takeUserInputs():
    valid = True
    nNum = True
    dNum = True
    inputN = 0
    inputD = 0

    # Prompts user for input
    inputIDText = input("Enter UserID as text: ")
    inputPwdText = input("Enter password as text: ")

    # try/catches to test if input is a number for N and D
    try:
        inputN = int(input("Enter value of N: "))
    except ValueError:
        nNum = False
    try:
        inputD = int(input("Enter value of D: "))
    except ValueError:
        dNum = False

    # Tests if input matches requirements and prints what's wrong
    if (("!" in inputIDText) or (" " in inputIDText)):
        valid = False
        print("Your userID should not have any '!' or spaces")
    if (("!" in inputPwdText) or (" " in inputPwdText)):
        valid = False
        print("Your password should not have any '!' or spaces")
    if (not nNum):
        valid = False
        print("N must be a number")
    elif (inputN < 1):
        valid = False
        print("N cannot be less than 1")
    if (not dNum):
        valid = False
        print("D must be a number")
    elif (not (inputD == 1 or inputD == -1)):
        valid = False
        print("D must be 1 or -1")

    return valid, inputIDText, inputPwdText, inputN, inputD
