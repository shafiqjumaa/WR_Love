"use client";

export default function DeleteButton({ action, id }: { action: (id: string) => Promise<void>; id: string }) {
  return (
    <button
      onClick={() => {
        if (confirm("متأكد بدك تحذف؟")) action(id);
      }}
      className="text-sm text-red-500 hover:underline"
    >
      حذف
    </button>
  );
}
