class HWSet():

    # def __init__(self, qty = 0):
    #     self.__projectID = 0
    #     self._capacity = qty
    #     self._availability = self._capacity

    def __init__(self, capacity, availability):
        # self.__projectID = 0
        self._capacity = capacity
        self._availability = availability

    def get_availability(self):
        return self._availability

    def get_capacity(self):
        return self._capacity


    def get_checkedout_qty(self):
        return self._capacity - self._availability
  
    def check_out(self, qty = 0):
       
        if(self._availability - qty >= 0):
            self._availability -= qty
            return 0
        else:
            self._availability = 0
        
            return -1

    def check_in(self, qty = 0):
        if(self._availability + qty <= self._capacity):
            self._availability += qty
            return 0
        else:
            self._availability = self._capacity
            return -1

    

    