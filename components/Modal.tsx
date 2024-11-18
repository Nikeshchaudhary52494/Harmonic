import * as Dialog from '@radix-ui/react-dialog';
import { IoMdClose } from 'react-icons/io';

type ModalProps = {
    isOpen: boolean,
    onChange: (open: boolean) => void,
    title: string,
    description: string,
    children: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({
    isOpen,
    onChange,
    children,
    title,
    description
}) => {
    return (
        <Dialog.Root open={isOpen} defaultOpen={isOpen} onOpenChange={onChange}>
            <Dialog.Portal>
                <Dialog.Overlay className='bg-black/80 backdrop-blur-sm fixed inset-0' />
                <Dialog.Content className='fixed top-[50%] left-[50%] max-h-full md:max-h-[90vh] md:w-[90vh] overflow-y-auto md:max-w-[450px] md:h-auto translate-x-[-50%] translate-y-[-50%] rounded-lg bg-[#171717] p-5 w-full h-full '>
                    <Dialog.Title className='text-xl font-bold mb-2'>
                        {title}
                    </Dialog.Title>
                    <Dialog.Description className='mb-5 text-sm leading-none text-neutral-400 ' >
                        {description}
                    </Dialog.Description>
                    <div>
                        {children}
                    </div>
                    <Dialog.Close asChild >
                        <button className='text-neutral-400 hover:text-white absolute top-[10px] right-[10px] focus:outline-none'>
                            <IoMdClose />
                        </button>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}

export default Modal
