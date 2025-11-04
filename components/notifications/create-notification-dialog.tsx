'use client';

import { useCreateNotificationMutation } from '@/features/notifications/notifications.mutations';
import {
  CreateNotificationRequest,
  CreateNotificationRequestSchema,
  NotificationTypeEnum,
} from '@/schemas/notifications.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectValue, SelectTrigger, SelectItem } from '@/components/ui/select';
import { Separator } from '../ui/separator';
import { Button } from '../ui/button';
import { Plus } from 'lucide-react';
import { Field, FieldError, FieldGroup, FieldLabel } from '../ui/field';
import { Input } from '../ui/input';

interface CreateNotificationDialogProps {
  userId: number;
}

export function CreateNotificationDialog({ userId }: CreateNotificationDialogProps) {
  const [open, setOpen] = useState(false);

  const { mutate: createNotification, isPending } = useCreateNotificationMutation();

  const form = useForm<Omit<CreateNotificationRequest, 'userId'>>({
    resolver: zodResolver(CreateNotificationRequestSchema.omit({ userId: true })),
    defaultValues: {
      type: 'WELCOME',
      subject: '',
      content: '',
      recipientEmail: '',
    },
  });

  const onSubmit = (data: Omit<CreateNotificationRequest, 'userId'>) => {
    createNotification(
      { userId, ...data },
      {
        onSuccess: () => {
          setOpen(false);
          form.reset();
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size='sm'>
          <Plus className='h-4 w-4 mr-2' />
          Create Notification
        </Button>
      </DialogTrigger>
      <DialogContent className='max-w-2xl'>
        <DialogHeader>
          <DialogTitle>Create New Notification</DialogTitle>
          <DialogDescription>Send a manual notification to a user</DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <FieldGroup className='space-y-2'>
            <Controller
              control={form.control}
              name='type'
              render={({ field }) => (
                <Field>
                  <FieldLabel>Type *</FieldLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder='Select type' />
                    </SelectTrigger>
                    <SelectContent>
                      {NotificationTypeEnum.options.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FieldError
                    errors={form.formState.errors.type ? [{ message: form.formState.errors.type.message }] : undefined}
                  />
                </Field>
              )}
            />

            <Controller
              control={form.control}
              name='subject'
              render={({ field }) => (
                <Field>
                  <FieldLabel>Subject *</FieldLabel>
                  <Input id={field.name} placeholder='Enter subject' {...field} />
                  <FieldError
                    errors={
                      form.formState.errors.subject ? [{ message: form.formState.errors.subject.message }] : undefined
                    }
                  />
                </Field>
              )}
            />

            <Controller
              control={form.control}
              name='content'
              render={({ field }) => (
                <Field>
                  <FieldLabel>Content *</FieldLabel>
                  <Input id={field.name} placeholder='Enter content' {...field} />
                  <FieldError
                    errors={
                      form.formState.errors.content ? [{ message: form.formState.errors.content.message }] : undefined
                    }
                  />
                </Field>
              )}
            />

            <Controller
              control={form.control}
              name='recipientEmail'
              render={({ field }) => (
                <Field>
                  <FieldLabel>Recipient Email *</FieldLabel>
                  <Input id={field.name} placeholder='Enter recipient email' {...field} />
                  <FieldError
                    errors={
                      form.formState.errors.recipientEmail
                        ? [{ message: form.formState.errors.recipientEmail.message }]
                        : undefined
                    }
                  />
                </Field>
              )}
            />
          </FieldGroup>

          <Separator />

          <div className='flex justify-end gap-2'>
            <Button type='button' variant='outline' onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type='submit' disabled={isPending}>
              {isPending ? 'Creating...' : 'Create Notification'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
