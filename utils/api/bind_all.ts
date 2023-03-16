/* eslint-disable @typescript-eslint/no-explicit-any */
const propertiesOf = (obj: object): Set<string | symbol> => {
  const props = new Set<string | symbol>()

  for (const prop of Reflect.ownKeys(obj)) {
    const desc = Reflect.getOwnPropertyDescriptor(obj, prop)

    if (desc && desc.value !== 'constructor') {
      props.add(prop)
    }
  }

  const nextProto = Reflect.getPrototypeOf(obj)

  if (nextProto && nextProto !== Object.prototype) {
    for (const p of Array.from(propertiesOf(nextProto).values())) {
      props.add(p)
    }
  }

  return props
}

export const bindAll = (inst: any) => {
  Array.from(propertiesOf(inst.constructor.prototype).values()).forEach(i => {
    inst[i] = inst[i].bind(inst)
  })
}
