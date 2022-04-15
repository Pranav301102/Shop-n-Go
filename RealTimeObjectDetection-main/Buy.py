lastId = 0
item = []
NoOfItems = []
product_info = [{1: ['Book', 30]},
                {2: ['Cocacola', 30]},
                {3: ['Eraser', 30]},
                {4: ['Pen', 30]},
                {5: ['Sizer', 30]}]

from tkinter import END

def add_item(my_listbox):
   my_listbox.insert("end", "item1", "item2", "item3", "item4", "item5")

def remove_items(my_listbox):
    for item in my_listbox.curselection():
        my_listbox.delete(item)
        my_listbox.insert("end", "foo")

def clear_list(my_listbox):
  my_listbox.delete(0, END)

def add_to_list(label_id, label):
    global lastId
    if label_id != lastId:
        NoOfItems.insert(0, label_id)
        lastId = label_id
        item = product_info[label_id]
        print(item)
        label["text"] = label_id

    if len(NoOfItems) > 20:
        NoOfItems.pop()
