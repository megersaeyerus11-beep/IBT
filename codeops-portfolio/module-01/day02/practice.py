# Q1 Temperature Label

temperature = int(input("Enter the temperature: "))

if temperature < 15:
    print("Cold")
elif 15 <= temperature <= 28:
    print("Warm")
else:
    print("Hot")


# Q2 Receipt Loop

for i in range(1, 10):
    print(f"Receipt {i}")


# Q3 Even Numbers

for i in range(1, 20):
    if i % 2 == 0:
        print(i)


# Q4 Discount Function

def apply_discount(price, percent=10):
    return price - (price * percent / 100)

print(apply_discount(100, 20))
print(apply_discount(100))


# Q5 Countdown

i = 5
while i > 0:
    print(i)
    i -= 1

print("Liftoff!")