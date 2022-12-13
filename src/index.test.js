// //Worker pseudo kod
// loop:
//   cost timeOut = randA.los()*40
//   cost data = randB.los()
//   sleep(timeOut)
//   fifo.push(data)
// //Głowny wątek
// loop:
//   cost timeOut = randC.los()*40
//   cost shoudRecive = randB'.los() //Ten generator ma takie same seed jak randB
//   sleep(timeout)
//   cost data = fifo.pop()
//   if(data!=shoudRecive) print error
