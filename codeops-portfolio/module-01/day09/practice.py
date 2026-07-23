#Q1  Build a BST
class Node:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None


def insert(root, value):
    if root is None:
        return Node(value)

    if value < root.value:
        root.left = insert(root.left, value)
    else:
        root.right = insert(root.right, value)

    return root


def inorder(root):
    if root:
        inorder(root.left)
        print(root.value)
        inorder(root.right)


balances = [5000, 3000, 2000, 4000, 6000, 1000]

root = None

for balance in balances:
    root = insert(root, balance)

print("Balances in sorted order:")
inorder(root)


#Q2 
class Node:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None


def height(node):
    if node is None:
        return 0

    return 1 + max(height(node.left), height(node.right))


root = Node(5000)
root.left = Node(2000)
root.right = Node(3000)
root.left.left = Node(1500)
root.left.right = Node(500)
root.left.left.left = Node(100)
root.left.left.left.left = Node(50)

print("Tree height:", height(root))

#Q3

from collections import deque
def bfs(graph, start):
     seen = {start}
     q = deque([start])
     while q:
         node = q.popleft()
         for n in graph[node]:
             if n not in seen:
                 seen.add(n)
                 q.append(n)
     return seen


graph = {
    "legess": ["mesi", "asu"],
    "mesi": ["legess", "eyerus", "haymi"],
    "asu": ["legess", "koki"],
    "eyerus": ["mesi", "hermon"],
    "haymi": ["mesi"],
    "koki": ["asu"],
   "hermon": ["eyerus"]
}
result = bfs(graph, "legess")

print(result)

#Q4

def dfs(graph, start, visited=None):

    if visited is None:
        visited = []

    visited.append(start)

    for neighbor in graph[start]:
        if neighbor not in visited:
            dfs(graph, neighbor, visited)

    return visited


dfs_result = dfs(graph, "legess")


print("\nDFS Visit Order:")
print(dfs_result)

#Q5
import heapq

tasks = []

heapq.heappush(tasks, (3, "needs"))
heapq.heappush(tasks, (1, "payment"))
heapq.heappush(tasks, (2, "work"))


print("Tasks by priority:")

while tasks:
    priority, task = heapq.heappop(tasks)
    print(priority, "-", task)