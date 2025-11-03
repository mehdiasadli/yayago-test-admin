'use client';

import { useState } from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogHeader, DialogFooter } from '../ui/dialog';
import { Button } from '../ui/button';
import { Loader2, Pencil, CheckCircle2, XCircle } from 'lucide-react';
import { DialogDescription } from '@radix-ui/react-dialog';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Textarea } from '../ui/textarea';
import { useSetUserStatusMutation } from '@/api/users/users.mutations';
import { Controller, useForm } from 'react-hook-form';
import { SetUserStatusRequestSchema, SetUserStatusRequestSchemaType } from '@/schemas/users.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Field, FieldError, FieldLabel } from '../ui/field';
import { Label } from '../ui/label';

interface SetUserStatusDialogProps {
  userId: number;
  initialStatus: boolean;
}

export function SetUserStatusDialog({ userId, initialStatus }: SetUserStatusDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  const close = () => setIsOpen(false);

  const { mutate: setUserStatus, isPending } = useSetUserStatusMutation(userId);

  const form = useForm<SetUserStatusRequestSchemaType>({
    resolver: zodResolver(SetUserStatusRequestSchema),
    defaultValues: {
      reason: '',
      active: initialStatus,
    },
  });

  const onSubmit = (data: SetUserStatusRequestSchemaType) => {
    setUserStatus(data, {
      onSuccess: () => {
        close();
        form.reset();
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size='icon' variant='ghost' className='ml-auto'>
          <Pencil className='size-3' />
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-4'>
          <DialogHeader>
            <DialogTitle>Set User Status</DialogTitle>
            <DialogDescription className='text-sm text-muted-foreground'>
              Change the user's account status. Inactive users cannot access the platform.
            </DialogDescription>
          </DialogHeader>

          <div className='space-y-4 py-2'>
            <Controller
              control={form.control}
              name='active'
              render={({ field }) => (
                <div className='space-y-3'>
                  <Label className='text-sm font-medium'>Status</Label>
                  <RadioGroup
                    value={field.value ? 'active' : 'inactive'}
                    onValueChange={(value) => field.onChange(value === 'active')}
                    className='grid grid-cols-2 gap-3'
                  >
                    <label
                      htmlFor='active'
                      className={`flex items-center justify-center gap-2 rounded-lg border-2 p-4 cursor-pointer transition-all ${
                        field.value
                          ? 'border-green-500 bg-green-500/10 text-green-700 dark:text-green-400'
                          : 'border-muted bg-background hover:border-muted-foreground/20'
                      }`}
                    >
                      <RadioGroupItem id='active' value='active' className='sr-only' />
                      <CheckCircle2
                        className={`size-5 ${field.value ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground'}`}
                      />
                      <span className='font-medium'>Active</span>
                    </label>

                    <label
                      htmlFor='inactive'
                      className={`flex items-center justify-center gap-2 rounded-lg border-2 p-4 cursor-pointer transition-all ${
                        !field.value
                          ? 'border-red-500 bg-red-500/10 text-red-700 dark:text-red-400'
                          : 'border-muted bg-background hover:border-muted-foreground/20'
                      }`}
                    >
                      <RadioGroupItem id='inactive' value='inactive' className='sr-only' />
                      <XCircle
                        className={`size-5 ${!field.value ? 'text-red-600 dark:text-red-400' : 'text-muted-foreground'}`}
                      />
                      <span className='font-medium'>Inactive</span>
                    </label>
                  </RadioGroup>
                  {form.formState.errors.active && (
                    <p className='text-sm text-destructive'>{form.formState.errors.active.message}</p>
                  )}
                </div>
              )}
            />

            <Controller
              control={form.control}
              name='reason'
              render={({ field }) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Reason (Optional)</FieldLabel>
                  <Textarea
                    {...field}
                    id={field.name}
                    placeholder='Provide a reason for this status change...'
                    className='min-h-[100px] resize-none'
                  />
                  <FieldError
                    errors={
                      form.formState.errors.reason ? [{ message: form.formState.errors.reason.message }] : undefined
                    }
                  />
                </Field>
              )}
            />
          </div>

          <DialogFooter className='gap-2'>
            <Button type='button' variant='outline' onClick={close} disabled={isPending}>
              Cancel
            </Button>
            <Button type='submit' disabled={isPending || form.watch('active') === initialStatus}>
              {isPending ? (
                <>
                  <Loader2 className='mr-2 size-4 animate-spin' />
                  Saving...
                </>
              ) : (
                'Save Changes'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
