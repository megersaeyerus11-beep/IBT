# Mini-Project: TeleBirr Customer Report

def customer_level(balance):
    if balance >= 1000:
        return "VIP"
    else:
        return "Regular"

customers = [
    ("Hermon", 1500),
    ("Haymi", 800),
    ("Eyerus", 2500),
    ("Abel", 600)
]

print("===== TeleBirr Customer Report =====")

for name, balance in customers:
    level = customer_level(balance)

    print("----------------------------")
    print("Customer Name :", name)
    print("Balance       :", balance, "ETB")

    if balance >= 1000:
        print("Bonus         : Eligible")
    else:
        print("Bonus         : Not Eligible")

    print("Customer Type :", level)

print("----------------------------")
print("End of Report")