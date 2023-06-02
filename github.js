const fs = require('fs')
const path = require('path')

const dir = 'src/environments'
const file = 'environment.ts'
const prodFile = 'environment.prod.ts'

const content = `${process.env.SUPABASE_DEETS}`

fs.access(dir, fs.constants.F_OK, err => {
  if (err) {
    console.log("src doesn't exist, creating it now", process.cwd())
    fs.mkdirSync(dir, { recursive: true }, err => {
      if (err) throw err
    })
  }

  try {
    fs.writeFileSync(dir + '/' + file, content)
    fs.writeFileSync(dir + '/' + prodFile, content)
    console.log('Successfully created file in', process.cwd())
    if (fs.existsSync(dir + '/' + file)) {
      console.log('File exists', path.resolve(dir + '/' + file))
      const str = fs.readFileSync(dir + '/' + file).toString()
      console.log(str)
    }
  } catch (error) {
    console.error('ERROR:', error)
    process.exit(1)
  }
})
