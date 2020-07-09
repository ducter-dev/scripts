const os = require('os') 
const fs = require('fs')
const puppeteer = require('puppeteer')


const escribirFile = (ruta, contenido, cb) => {
  fs.writeFile(ruta,contenido, (err) => {
    if (err) {
      console.erro('NO he podido escribir', err)
    }
    cb('El archivo ha terminado de escribirse')
    return
  })
} 

const run = async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto('http://api.imco.org.mx/wiki/index.php/Listado_de_municipios_de_la_Rep%C3%BAblica_Mexicana')

  const data = await page.evaluate(()=> {
    const result = document.querySelectorAll('.sortable > tbody > tr')
    const data = []
    result.forEach(item => {
      const datos = item.querySelectorAll('td')
      data.push({
        id: (datos[0].textContent).trim(),
        municipio: (datos[1].textContent).trim(),
        estado: (datos[2].textContent.trim())
      })
    })

    return {
      municipios: data
    }
    
  })
  escribirFile(__dirname + '/mun.json', JSON.stringify(data), console.log)
}

run()