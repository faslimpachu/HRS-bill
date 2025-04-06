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
            <label htmlFor={key} className="capitalize mb-1">
              {key.replace(/([A-Z])/g, ' $1')}
            </label>
            <input
              type={key === 'date' ? 'date' : 'text'}
              name={key}
              id={key}
              value={formData[key]}
              onChange={handleChange}
              className="border p-2 rounded"
            />
          </div>
        ))}
      </div>

      {/* Receipt Preview */}
      <div
        ref={receiptRef}
        className="bg-white border border-black p-6 sm:p-8 w-full max-w-3xl shadow-xl"
      >
        <div className="text-center font-bold border-b border-black pb-2 mb-4 text-lg">
          FREIGHT RECEIPT
        </div>

        <div className="mb-4 text-sm">
          <div className="mb-2">
            Consignor: <span className="font-semibold ml-2">{formData.consignor}</span>
          </div>
          <div className="mb-2">
            Consignee: <span className="font-semibold ml-2">{formData.consignee}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4 text-sm">
          <div>From: {formData.from}</div>
          <div>To: {formData.to}</div>
          <div>Invoice No.: {formData.invoiceNo}</div>
          <div>Date: {formData.date}</div>
        </div>

        <div className="text-sm space-y-2">
          <p>Dear Sir,</p>
          <div className="text-center leading-5">
            <p>
              Today we are sending {formData.itemCount} Bags ( {formData.bags} ) by Lorry No. {formData.lorryNo}.
            </p>
            <p>Please take delivery in good condition and acknowledge the same.</p>
            <p>
              Pay lorry hire of Rs. {formData.hire}. Total Freight: Rs. {formData.totalFreight}.
            </p>
            <p>Advance: Rs. {formData.advance}. Balance to pay: Rs. {formData.balance}.</p>
            <p>(Amount in words: {formData.amountInWords})</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between mt-8 items-start sm:items-end text-sm">
          <div className="font-semibold">
            N. B.: <span className="underline">Unloading by Party only</span>
          </div>
          <div className="italic">Your's faithfully,</div>
        </div>

        <div className="text-sm mt-4 italic text-center">Thanking You</div>
      </div>

      {/* Download Button */}
      <div className="text-center">
        <button
          onClick={downloadImage}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Download Invoice as Image
        </button>
      </div>
    </div>
  );
}
