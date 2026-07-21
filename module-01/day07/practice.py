#1Q Name the Big-O
numbers = [10, 20, 30, 40, 50]

print(numbers[2])  


for num in numbers:
    print(num)


for i in numbers:
    for j in numbers:
        print(i, j)

accounts = {
    "A001": "Eyerus",
    "A002": "Hermon"
}

print(accounts["A002"])


def binary_search(arr, target):
    left = 0
    right = len(arr)-1

    while left <= right:
        mid = (left + right) // 2

        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1

#Q2 List vs Dict Lookup Timing

import time

account_list = [f"A{i}" for i in range(100000)]

account_dict = {
    f"A{i}": True for i in range(100000)
}

target = "A99999"


start = time.time()

if target in account_list:
    print("Found in list")

list_time = time.time() - start


start = time.time()

if target in account_dict:
    print("Found in dictionary")

dict_time = time.time() - start


print("List lookup time:", list_time)
print("Dict lookup time:", dict_time)

#Q3 Build a Stack
class Stack:
    def __init__(self):
        self.items = []

    def push(self, item):
        self.items.append(item)

    def pop(self):
        return self.items.pop()

    def peek(self):
        return self.items[-1]



names = ["Eyerus", "Hermon", "Ermi", "Haymi"]

stack = Stack()

for name in names:
    stack.push(name)

reversed_names = []

while stack.items:
    reversed_names.append(stack.pop())

print(reversed_names)

#Q4 Build a Queue Using deque

from collections import deque

bank_queue = deque()

bank_queue.append("Customer 1")
bank_queue.append("Customer 2")
bank_queue.append("Customer 3")
bank_queue.append("Customer 4")
bank_queue.append("Customer 5")


while bank_queue:
    customer = bank_queue.popleft()
    print("Serving:", customer)

#Q5 Singly Linked List

class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class LinkedList:
    def __init__(self):
        self.head = None

    def push_front(self, data):
        new_node = Node(data)

        new_node.next = self.head
        self.head = new_node

    def print_all(self):
        current = self.head

        while current:
            print(current.data)
            current = current.next

