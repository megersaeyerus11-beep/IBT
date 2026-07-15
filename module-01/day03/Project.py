# Pharmacy Inventory Tracker

inventory = {
    "Paracetamol": 50,
    "Amoxicillin": 30,
    "Ibuprofen": 40,
    "Vitamin C": 100
}

# Write inventory to a file
with open("pharmacy.txt", "w") as file:
    for medicine, quantity in inventory.items():
        file.write(f"{medicine},{quantity}\n")

print("Inventory saved to file.\n")

# Read inventory from file
print("Current Pharmacy Stock:")

try:
    with open("pharmacy.txt", "r") as file:
        for line in file:
            medicine, quantity = line.strip().split(",")
            print(medicine, ":", quantity, "units")

except FileNotFoundError:
    print("Inventory file not found.")

# Add new stock
try:
    name = input("\nEnter medicine name: ")
    amount = int(input("Enter quantity: "))

    inventory[name] = amount

    print("\nUpdated Inventory:")
    for medicine, quantity in inventory.items():
        print(medicine, ":", quantity, "units")

except ValueError:
    print("Please enter a valid number for quantity.")