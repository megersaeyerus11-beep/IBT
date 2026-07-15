
# transaction loge reader/ in class exersis
try:
 with open("transaction.txt","r") as file:
    transaction_dic = {}
    
    for line in file:
      name,total_spend = line.strip().split("=")
      total_spend = float(total_spend)

      if name in transaction_dic:
        transaction_dic[name]+= total_spend
      else:
        transaction_dic[name] =total_spend

except FileNotFoundError:
  print("file not founde.")
  

def sort_transaction(transaction_dic):

    sort_transaction=sorted(transaction_dic.items(),
    key=lambda item: item[1],
    reverse=true
    
    ),


with open("report.txt", "w") as file:
      file.write("Customer Report \n\n\n")

      for name,total_spend in transaction_dic.items():
        file.write(f"{name}:{total_spend}\n\n")

      file.write(f"customer length = {len(name)}")


print (sort_transaction)

        
