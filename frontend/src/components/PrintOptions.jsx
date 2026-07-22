import React from "react";
import {
  FileText,
  Palette,
  Copy,
  RotateCw,
  BookOpen,
  Shield,
} from "lucide-react";

export default function PrintOptions({ values, onChange }) {
  const updateValue = (field, value) => {
    onChange({
      ...values,
      [field]: value,
    });
  };

  return (
    <div className="space-y-8">

      {/* Paper Type */}

      <div>
        <label className="flex items-center gap-2 font-semibold mb-3">
          <FileText size={20} />
          Paper Size
        </label>

        <select
          value={values.paperType}
          onChange={(e) => updateValue("paperType", e.target.value)}
          className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
        >
          <option>A4</option>
          <option>A3</option>
          <option>Letter</option>
        </select>
      </div>

      {/* Color */}

      <div>
        <label className="flex items-center gap-2 font-semibold mb-3">
          <Palette size={20} />
          Print Type
        </label>

        <select
          value={values.color}
          onChange={(e) => updateValue("color", e.target.value)}
          className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
        >
          <option>Color</option>
          <option>Black & White</option>
        </select>
      </div>

      {/* Orientation */}

      <div>
        <label className="flex items-center gap-2 font-semibold mb-3">
          <RotateCw size={20} />
          Orientation
        </label>

        <select
          value={values.orientation}
          onChange={(e) =>
            updateValue("orientation", e.target.value)
          }
          className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
        >
          <option>Portrait</option>
          <option>Landscape</option>
        </select>
      </div>

      {/* Print Side */}

      <div>
        <label className="font-semibold mb-3 block">
          Print Side
        </label>

        <select
          value={values.printSide}
          onChange={(e) =>
            updateValue("printSide", e.target.value)
          }
          className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
        >
          <option>Single Side</option>
          <option>Double Side</option>
        </select>
      </div>

      {/* Binding */}

      <div>
        <label className="flex items-center gap-2 font-semibold mb-3">
          <BookOpen size={20} />
          Binding
        </label>

        <select
          value={values.binding}
          onChange={(e) =>
            updateValue("binding", e.target.value)
          }
          className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
        >
          <option>None</option>
          <option>Spiral</option>
          <option>Hard Binding</option>
        </select>
      </div>

      {/* Lamination */}

      <div>
        <label className="flex items-center gap-2 font-semibold mb-3">
          <Shield size={20} />
          Lamination
        </label>

        <select
          value={values.lamination}
          onChange={(e) =>
            updateValue("lamination", e.target.value)
          }
          className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
        >
          <option>No</option>
          <option>Yes</option>
        </select>
      </div>

      {/* Copies */}

      <div>

        <label className="flex items-center gap-2 font-semibold mb-3">
          <Copy size={20} />
          Copies
        </label>

        <div className="flex items-center gap-4">

          <button
            type="button"
            onClick={() =>
              updateValue(
                "copies",
                Math.max(1, values.copies - 1)
              )
            }
            className="w-10 h-10 rounded-full bg-red-500 text-white text-xl hover:bg-red-600"
          >
            −
          </button>

          <span className="text-2xl font-bold w-10 text-center">
            {values.copies}
          </span>

          <button
            type="button"
            onClick={() =>
              updateValue("copies", values.copies + 1)
            }
            className="w-10 h-10 rounded-full bg-green-500 text-white text-xl hover:bg-green-600"
          >
            +
          </button>

        </div>

      </div>

    </div>
  );
}