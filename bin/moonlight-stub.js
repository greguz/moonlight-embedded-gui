#!/usr/bin/env node

const program = require('commander')

const write = (stream, ...args) => stream.write(args.join('\n') + '\n')
const out = (...args) => write(process.stdout, ...args)
const err = (...args) => write(process.stderr, ...args)
const exit = (status = 0) => {
  if (status instanceof Error) {
    err(status.message)
    process.exit(1)
  } else if (typeof status === 'string') {
    out(status)
    process.exit(0)
  } else if (typeof status === 'number') {
    process.exit(status)
  } else {
    process.exit()
  }
}

const cast = (v, def) => v === true ? def : v === false ? null : (v || null)

program
  .version('2.3.0') // version of moonlight used as example output
  .option('-m, --model <name>', 'printed graphic card model', 'NVIDIA GeForce GTX 760')
  .option('-g, --gfe <version>', 'printed GeForce Experience version', '3.6.0.74')
  .option('-p, --protocol <version>', 'printed detected protocol', '7')

program
  .command('pair <host>')
  .description('Pair this computer with the host')
  .option('-c, --code <number>', 'printed pairing code', '8435')
  .option('-w, --wait [seconds]', 'seconds to wait before exit', parseFloat)
  .option('-f, --fail [reason]', 'fail pairing')
  .action((host, options) => {
    out(
      `Moonlight Embedded ${program.version()}`,
      `Connect to ${host}...`,
      `${program.model}, GFE ${program.gfe} (protocol version ${program.protocol})`,
      `Please enter the following PIN on the target PC: ${options.code}`
    )

    const end = () => {
      if (options.fail) {
        exit(new Error(`Failed to pair to server: ${cast(options.fail, 'Failed to sign data')}`))
      } else {
        exit('Success')
      }
    }

    if (options.wait) {
      setTimeout(end, cast(options.wait, 2) * 1000)
    } else {
      end()
    }
  })

program
  .command('*')
  .action(() => exit(new Error('Invalid command')))

program.parse(process.argv)
