'use client';

import { CreateUserRequestSchema, CreateUserRequestSchemaType } from '@/schemas/users.schema';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateUserMutation } from '@/features/users/users.mutations';
import { toast } from 'sonner';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

export function AddUserForm() {
  const form = useForm<CreateUserRequestSchemaType>({
    resolver: zodResolver(CreateUserRequestSchema),
    defaultValues: {
      email: '',
      password: '',
      fullName: '',
      phoneNumber: '',
      admin: false,
    },
  });

  const { mutate: createUser, isPending } = useCreateUserMutation();

  const onSubmit = (data: CreateUserRequestSchemaType) => {
    createUser(data, {
      onSuccess: () => {
        toast.success('User created successfully');
        form.reset();
      },
    });
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-4 max-w-md'>
      <Controller
        control={form.control}
        name='email'
        render={({ field }) => (
          <Field>
            <FieldLabel htmlFor={field.name}>Email</FieldLabel>
            <Input id={field.name} placeholder='admin@example.com' {...field} />
            <FieldError
              errors={form.formState.errors.email ? [{ message: form.formState.errors.email.message }] : undefined}
            />
          </Field>
        )}
      />

      <Controller
        control={form.control}
        name='password'
        render={({ field }) => (
          <Field>
            <FieldLabel htmlFor={field.name}>Password</FieldLabel>
            <Input id={field.name} type='password' placeholder='••••••••' {...field} />
          </Field>
        )}
      />

      <Controller
        control={form.control}
        name='fullName'
        render={({ field }) => (
          <Field>
            <FieldLabel htmlFor={field.name}>Full Name</FieldLabel>
            <Input id={field.name} placeholder='John Doe' {...field} />
            <FieldError
              errors={
                form.formState.errors.fullName ? [{ message: form.formState.errors.fullName.message }] : undefined
              }
            />
          </Field>
        )}
      />

      <Controller
        control={form.control}
        name='phoneNumber'
        render={({ field }) => (
          <Field>
            <FieldLabel htmlFor={field.name}>Phone Number</FieldLabel>
            <Input id={field.name} placeholder='+1234567890' {...field} />
          </Field>
        )}
      />

      <Controller
        control={form.control}
        name='admin'
        render={({ field }) => (
          <Field>
            <div className='relative flex w-full items-start gap-2 rounded-md border border-input p-4 shadow-xs outline-none has-data-[state=checked]:border-primary/50'>
              <Switch
                id={field.name}
                className='order-1 h-4 w-6 after:absolute after:inset-0 [&_span]:size-3 data-[state=checked]:[&_span]:translate-x-2 data-[state=checked]:[&_span]:rtl:-translate-x-2'
                aria-describedby={`${field.name}-description`}
              />
              <div className='grid grow gap-2'>
                <Label htmlFor={field.name}>
                  Admin <span className='text-xs leading-[inherit] font-normal text-muted-foreground'>(Sublabel)</span>
                </Label>
              </div>
            </div>
            <FieldError
              errors={form.formState.errors.admin ? [{ message: form.formState.errors.admin.message }] : undefined}
            />
          </Field>
        )}
      />

      <Button type='submit' disabled={isPending}>
        {isPending ? <Loader2 className='size-4 animate-spin' /> : 'Create User'}
      </Button>
    </form>
  );
}
