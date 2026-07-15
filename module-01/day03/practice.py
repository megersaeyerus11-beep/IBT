#Q1
cities = ["jimma", "adama", "harer", "dessie", "mekelle", "addis abeba", "mekelle"]

unique_cities = set(cities)

print(unique_cities)
print(len(unique_cities))

# Price report Q2
prices = {
    "soft drink": 50,
    "beer": 150,
    "wine": 1000,
    "vodka": 1800,
    "black label": 15000
}

for item, price in prices.items():
    print(item, ":", price, "ETB")  
        

#Tax comprehension Q3
prices = [100, 250, 400, 80]

     prices_with_tax = [price * 1.15 for price in prices]

           print(prices_with_tax)


# Cheap items Q4
prices = [100, 250, 400, 80]

      cheap_items = [price for price in prices if price < 200]

          print(cheap_items)

# Write and read Q5
with open("names.txt", "w") as file:
    file.write("eyerus\n")
    file.write("hermon\n")
    file.write("ermi\n")


with open("names.txt", "r") as file:
    for name in file:
        print(name.strip())

# Safe division Q6
try:
    number = float(input("Enter a number: "))      # 10
    result = 1000 / number                         # 1000/10
    print("Result:", result)                       #100

except ValueError:
    print("Please enter a valid number.")           #eyerus

except ZeroDivisionError:
    print("Cannot divide by zero.")                  #0
          
