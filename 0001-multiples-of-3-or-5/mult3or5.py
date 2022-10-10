#
#  first pass solution
#   get it done... even it is slow
#
def mult3or5(below):
    sum = 0
    for i in range(below-1):
        if i % 3 == 0 or i % 5 == 0:
            sum += i
    return sum

below = 1000
print('below: ', below, '   sum: ', mult3or5(below) )