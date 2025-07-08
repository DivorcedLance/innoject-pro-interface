import { useState } from 'react';
import { useNumpad } from '../../contexts/useNumpad';

const NumPadDemo = () => {
  const { openNumpad } = useNumpad();

  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [phone, setPhone] = useState('');
  const [custom, setCustom] = useState('');

  // side es configurable por cada campo
  const openNumpadFor = (
    current: string,
    setter: (v: string) => void,
    side: 'left' | 'right'
  ) => {
    openNumpad({
      initialValue: current,
      side,
      onEnter: setter,
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-gray-50">
      <h1 className="text-2xl mb-4 font-bold">Ejemplo Inputs + NumPad</h1>
      
      <div className="flex flex-col gap-5 w-80">
        <label className="flex flex-col">
          <span className="mb-1 font-semibold">Cantidad</span>
          <input
            className="border p-2 rounded text-lg w-full text-right cursor-pointer bg-white"
            value={quantity}
            readOnly
            onClick={() => openNumpadFor(quantity, setQuantity, 'right')}
            placeholder="Toca para ingresar"
          />
        </label>

        <label className="flex flex-col">
          <span className="mb-1 font-semibold">Precio</span>
          <input
            className="border p-2 rounded text-lg w-full text-right cursor-pointer bg-white"
            value={price}
            readOnly
            onClick={() => openNumpadFor(price, setPrice, 'left')}
            placeholder="Toca para ingresar"
          />
        </label>

        <label className="flex flex-col">
          <span className="mb-1 font-semibold">Teléfono</span>
          <input
            className="border p-2 rounded text-lg w-full text-right cursor-pointer bg-white"
            value={phone}
            readOnly
            onClick={() => openNumpadFor(phone, setPhone, 'right')}
            placeholder="Toca para ingresar"
          />
        </label>

        <label className="flex flex-col">
          <span className="mb-1 font-semibold">Personalizado</span>
          <input
            className="border p-2 rounded text-lg w-full text-right cursor-pointer bg-white"
            value={custom}
            readOnly
            onClick={() => openNumpadFor(custom, setCustom, 'left')}
            placeholder="Toca para ingresar"
          />
        </label>
      </div>
    </div>
  );
};

export default NumPadDemo;
