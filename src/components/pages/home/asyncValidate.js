const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const asyncValidate = (values) => {
  return sleep(1000) // simulate server latency
    .then(() => {
    	console.log('in asyncValidate');
      if ([ '0@0.0', 'paul', 'george', 'ringo' ].includes(values.email)) {
        throw { username: 'That username is taken' }
      }
    })
}

export default asyncValidate
