const { exec, spawn } = require('child_process')

let procesoIRGE = spawn('ping', ['10.122.40.102', '-c', '1'])

//console.log(procesoIRGE.pid)
//console.log(procesoIRGE.connected)

procesoIRGE.stdout.on('data', (dato) => {
  let info = (dato.toString()).split(' ')
  let myPing = {}
  if (parseInt(info[13]) == 0) {
    myPing = {
      ip: info[1],
      recibidos: info[13],
      perdidos: info[15]
    }

  } else {
    myPing = {
      ip: info[1],
      time: info[12],
      recibidos: info[20],
      perdidos: info[22]
    }
  }
  console.log(myPing)
})

procesoIRGE.on('exit', () => {
  console.log('El procesoIRGE terminó')
})