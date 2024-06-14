import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
export default function DialogPopup({
  onClose,
  title,
  header,
  subheader = null,
  action,
}) {
  return (
    <Dialog open={true} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="max-w-lg space-y-4 border bg-alt-bg p-10">
          <DialogTitle className="font-bold text-xl">{title}</DialogTitle>
          <Description>{header}</Description>

          <div className="flex gap-4">
            <button
              onClick={onClose}
              className="font-bold bg-button-bg text-button-text text-1xl p-2.5 rounded-xl hover:bg-button-hover"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                action();
                onClose();
              }}
              className="font-bold bg-button-bg text-button-text text-1xl p-2.5 rounded-xl hover:bg-button-hover"
            >
              Confirm
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
