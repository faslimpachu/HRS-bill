'use client';
import React from 'react';
import html2canvas from 'html2canvas';
import { useRef, useState } from 'react';

type FormFields = {
  consignor: string;
  consignee: string;
  from: string;
  to: string;
  invoiceNo: string;
  date: string;
  itemCount: string;
  bags: string;
  lorryNo: string;
  hire: string;
  totalFreight: string;
  advance: string;
  balance: string;
  amountInWords: string;
};

type FieldKey = keyof FormFields;

export default function Home() {
  const receiptRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState<FormFields>({
    consignor: 'HRS TRADERS',
    consignee: '',
    from: '',
    to: '',
    invoiceNo: '',
    date: '',
    itemCount: '',
    bags: '',
    lorryNo: '',
    hire: '',
    totalFreight: '',
    advance: '',
    balance: '',
    amountInWords: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name as FieldKey]: value }));
  };

  const downloadImage = async () => {
    if (!receiptRef.current) return;
    const canvas = await html2canvas(receiptRef.current);
    const link = document.createElement('a');
    link.download = 'HRS-freight-receipt.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const fieldKeys: FieldKey[] = [
    'consignor', 'consignee', 'from', 'to', 'invoiceNo', 'date',
    'itemCount', 'bags', 'lorryNo', 'hire', 'totalFreight',
    'advance', 'balance', 'amountInWords'
  ];
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 space-y-10">

      {/* Form Section */}
      <div className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white p-6 shadow rounded">
        {fieldKeys.map((key) => (
          <div key={key} className="flex flex-col">
            <label htmlFor={key} className="capitalize mb-1 text-black font-medium">
              {key.replace(/([A-Z])/g, ' $1')}
            </label>
            <input
              type={key === 'date' ? 'date' : 'text'}
              name={key}
              id={key}
              value={formData[key]}
              onChange={handleChange}
              className="border p-2 rounded text-black"
              placeholder={`Enter ${key.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
            />
          </div>
        ))}
      </div>

      {/* Receipt Preview */}
      <div
        ref={receiptRef}
        className="bg-white border border-black p-6 sm:p-8 w-full max-w-3xl shadow-xl text-black"
      >
        <div className="text-center font-bold border-b border-black pb-2 mb-4 text-lg text-black">
          FREIGHT RECEIPT
        </div>

        <div className="mb-4 text-sm text-black">
          <div className="mb-2">
            <span className="text-black">Consignor:</span> <span className="font-semibold ml-2 text-black">{formData.consignor}</span>
          </div>
          <div className="mb-2">
            <span className="text-black">Consignee:</span> <span className="font-semibold ml-2 text-black">{formData.consignee}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4 text-sm text-black">
          <div><span className="text-black">From:</span> {formData.from}</div>
          <div><span className="text-black">To:</span> {formData.to}</div>
          <div><span className="text-black">Invoice No.:</span> {formData.invoiceNo}</div>
          <div><span className="text-black">Date:</span> {formData.date}</div>
        </div>

        <div className="text-sm space-y-2 text-black">
          <p className="text-black">Dear Sir,</p>
          <div className="text-center leading-5 text-black">
            <p className="text-black">
              Today we are sending {formData.itemCount} Bags ( {formData.bags} ) by Lorry No. {formData.lorryNo}.
            </p>
            <p className="text-black">Please take delivery in good condition and acknowledge the same.</p>
            <p className="text-black">
              Pay lorry hire of Rs. {formData.hire}. Total Freight: Rs. {formData.totalFreight}.
            </p>
            <p className="text-black">Advance: Rs. {formData.advance}. Balance to pay: Rs. {formData.balance}.</p>
            <p className="text-black">(Amount in words: {formData.amountInWords})</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between mt-8 items-start sm:items-end text-sm text-black">
          <div className="font-semibold text-black">
            N. B.: <span className="underline text-black">Unloading by Party only</span>
          </div>
          <div className="italic text-black">Your's faithfully,</div>
        </div>

        <div className="text-sm mt-4 italic text-center text-black">Thanking You</div>
      </div>

      {/* Download Button */}
      <div className="text-center">
        <button
          onClick={downloadImage}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 font-medium"
        >
          Download Invoice as Image
        </button>
      </div>
    </div>
  );
}