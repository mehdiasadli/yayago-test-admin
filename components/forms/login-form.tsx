'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema, LoginSchemaType } from '@/schemas/auth.schema';
import { Loader2 } from 'lucide-react';
import { login } from '@/api/auth/auth.actions';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useState } from 'react';

export function LoginForm({ className, ...props }: React.ComponentProps<'form'>) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (data: LoginSchemaType) => {
    try {
      setError(null);
      const result = await login(data);

      if (result.success) {
        toast.success('Login successful!');
        router.push('/');
        router.refresh();
      } else {
        setError(result.error || 'Login failed. Please try again.');
        toast.error(result.error || 'Login failed. Please try again.');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  return (
    <form className={cn('flex flex-col gap-6', className)} {...props} onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <div className='flex flex-col items-center gap-1 text-center'>
          <h1 className='text-2xl font-bold'>Login to your account</h1>
          <p className='text-muted-foreground text-sm text-balance'>Enter your email below to login to your account</p>
        </div>

        {error && <div className='rounded-md bg-destructive/15 p-3 text-sm text-destructive'>{error}</div>}
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
              <FieldError
                errors={
                  form.formState.errors.password ? [{ message: form.formState.errors.password.message }] : undefined
                }
              />
            </Field>
          )}
        />

        <Field>
          <Button type='submit' disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? <Loader2 className='size-4 animate-spin' /> : 'Login'}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
