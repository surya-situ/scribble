import React from 'react'
import { Button, ButtonProps } from './button'
import { Loader2 } from 'lucide-react'

type LoadingButtonProps = {
    loading: boolean
} & ButtonProps

export default function loadingButton({children, loading, ...props}: LoadingButtonProps) {
  return (
    <Button {...props} disabled={props.disabled || loading}>
        {loading && <Loader2 className='mr-4 h-4 w-4 animate-spin' />}
      {children}
    </Button>
  )
}
