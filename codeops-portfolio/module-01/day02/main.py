# TeleBirr Tip Calculator

# Step 1: Bill information
total_bill = 5000  # ETB
friends = ["Hermon", "Haymi", "Eyerus"]
number_of_people = len(friends)
tip_rate = 0.10  # 10% tip

# Step 2: Function to split the bill
def split_bill(total, people, tip_rate=0.10):
    total_with_tip = total * (1 + tip_rate)
    per_person = total_with_tip / people
    return per_person

# Step 3: Display the report
print("=== TeleBirr Tip Calculator ===")
print(f"Total Bill: {total_bill} ETB")
print(f"Tip Rate: {tip_rate * 100:.0f}%")
print(f"Number of People: {number_of_people}")
print()

# Step 4: Print each person's share
for person in friends:
    share = split_bill(total_bill, number_of_people, tip_rate)
    print(f"{person}'s share is {share:.2f} ETB")


