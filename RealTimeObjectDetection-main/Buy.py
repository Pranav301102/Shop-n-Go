
lastId = 0

NoOfItems = []
product_info = [{1: ['Book', 30]},
                {2: ['Cocacola', 30]},
                {3: ['Eraser', 30]},
                {4: ['Pen', 30]},
                {5: ['Sizer', 30]}]


def additem():
    pass

def remove_items():
    pass


def add_to_list(label_id, label):
    global lastId
    if label_id != lastId:
        NoOfItems.insert(0, label_id)
        lastId = label_id
        label["text"] = label_id

    if len(NoOfItems) > 20:
        NoOfItems.pop()