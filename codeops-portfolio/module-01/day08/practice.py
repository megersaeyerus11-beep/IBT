#Q1 Recursive Sum and Count Down

# Recursive sum
def total(nums):
    if len(nums) == 0:
        return 0

    return nums[0] + total(nums[1:])


# Recursive count down
def count_down(n):
    if n == 0:
        return

    print(n)
    count_down(n - 1)


numbers = [10, 20, 30, 40]

print("Total:", total(numbers))

count_down(5)

#Q2 Binary Search
def binary_search(items, target):
    left = 0
    right = len(items) - 1

    while left <= right:
        mid = (left + right) // 2

        if items[mid] == target:
            return mid

        elif items[mid] < target:
            left = mid + 1

        else:
            right = mid - 1

    return -1


# Sorted account balances
balances = [1000, 2500, 4000, 5000, 7000, 9000]

target = 5000

index = binary_search(balances, target)

print("Index:", index)

#Q3 Merge Sort
def merge(left, right):
    result = []

    i = 0
    j = 0

    while i < len(left) and j < len(right):

        if left[i] <= right[j]:
            result.append(left[i])
            i += 1

        else:
            result.append(right[j])
            j += 1


    result.extend(left[i:])
    result.extend(right[j:])

    return result



def merge_sort(items):

    if len(items) <= 1:
        return items

    mid = len(items) // 2

    left = merge_sort(items[:mid])
    right = merge_sort(items[mid:])

    return merge(left, right)



# Test
import random

numbers = [random.randint(1, 100) for _ in range(10)]

print("Original:", numbers)

print("Merge Sort:", merge_sort(numbers))

print("Python sorted:", sorted(numbers))

#Q4 Sort with a Key
accounts = [
    ("Eyerus", 5000),
    ("Hermon", 8000),
    ("Ermi", 3000),
    ("Haymi", 10000)
]


# Sort by balance descending
sorted_accounts = sorted(
    accounts,
    key=lambda account: account[1],
    reverse=True
)


print(sorted_accounts)

#Q5 Two Pointers
def has_pair(nums, target):

    left = 0
    right = len(nums) - 1

    while left < right:

        total = nums[left] + nums[right]

        if total == target:
            return True

        elif total < target:
            left += 1

        else:
            right -= 1

    return False



# Sorted balances
balances = [1000, 2000, 3000, 4000, 5000]

print(has_pair(balances, 7000))
print(has_pair(balances, 9000))