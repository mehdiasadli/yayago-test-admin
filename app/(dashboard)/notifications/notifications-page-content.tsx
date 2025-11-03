'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useQuery } from '@tanstack/react-query';
import { createGetNotificationsByUserQueryOptions } from '@/features/notifications/notifications.queries';
import {
  useCreateNotificationMutation,
  useProcessPendingNotificationsMutation,
  useRetryFailedNotificationsMutation,
} from '@/features/notifications/notifications.mutations';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Bell,
  CheckCircle2,
  XCircle,
  Clock,
  RefreshCw,
  PlayCircle,
  Plus,
  Mail,
  User,
  Calendar,
  AlertCircle,
} from 'lucide-react';
import { format } from 'date-fns';
import {
  Notification,
  NotificationStatus,
  NotificationType,
  NotificationTypeEnum,
} from '@/schemas/notifications.schema';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export function NotificationsPageContent() {
  const { data: session, status: sessionStatus } = useSession();
  const userId = session?.user?.id ? Number(session.user.id) : 0;

  const [statusFilter, setStatusFilter] = useState<NotificationStatus | 'ALL'>('ALL');
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);

  // Queries
  const { data: notifications, isLoading } = useQuery({
    ...createGetNotificationsByUserQueryOptions({ userId }),
    enabled: userId > 0,
  });

  // Mutations
  const createMutation = useCreateNotificationMutation();
  const retryMutation = useRetryFailedNotificationsMutation();
  const processMutation = useProcessPendingNotificationsMutation();

  // Filter notifications by status
  const filteredNotifications =
    notifications?.filter((n) => (statusFilter === 'ALL' ? true : n.status === statusFilter)) || [];

  // Group notifications by status for stats
  const stats = {
    total: notifications?.length || 0,
    pending: notifications?.filter((n) => n.status === 'PENDING').length || 0,
    sent: notifications?.filter((n) => n.status === 'SENT').length || 0,
    failed: notifications?.filter((n) => n.status === 'FAILED').length || 0,
    cancelled: notifications?.filter((n) => n.status === 'CANCELLED').length || 0,
  };

  // Handle loading state
  if (sessionStatus === 'loading') {
    return (
      <div className='space-y-6'>
        <Card>
          <CardHeader>
            <Skeleton className='h-6 w-48' />
            <Skeleton className='h-4 w-64 mt-2' />
          </CardHeader>
        </Card>
        <div className='grid gap-4 md:grid-cols-5'>
          {Array.from({ length: 5 }).map((_, i) => (
            <Card key={i}>
              <CardHeader className='pb-3'>
                <Skeleton className='h-4 w-16' />
              </CardHeader>
              <CardContent>
                <Skeleton className='h-8 w-12' />
              </CardContent>
            </Card>
          ))}
        </div>
        <Card>
          <CardHeader>
            <Skeleton className='h-6 w-32' />
            <Skeleton className='h-4 w-48 mt-2' />
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className='h-24 w-full' />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Handle unauthenticated state
  if (sessionStatus === 'unauthenticated') {
    return (
      <Card>
        <CardContent className='flex flex-col items-center justify-center py-10'>
          <User className='h-12 w-12 text-muted-foreground mb-4' />
          <h3 className='text-lg font-semibold mb-2'>Not authenticated</h3>
          <p className='text-sm text-muted-foreground'>Please sign in to view notifications.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className='space-y-6'>
      {/* Admin Controls */}
      <Card>
        <CardHeader>
          <div className='flex items-center justify-between'>
            <div>
              <CardTitle>Admin Controls</CardTitle>
              <CardDescription>Manage notification processing and create new notifications</CardDescription>
            </div>
            <div className='flex items-center gap-2'>
              <Button
                variant='outline'
                size='sm'
                onClick={() => retryMutation.mutate()}
                disabled={retryMutation.isPending || stats.failed === 0}
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${retryMutation.isPending ? 'animate-spin' : ''}`} />
                Retry Failed ({stats.failed})
              </Button>
              <Button
                variant='outline'
                size='sm'
                onClick={() => processMutation.mutate()}
                disabled={processMutation.isPending || stats.pending === 0}
              >
                <PlayCircle className={`h-4 w-4 mr-2 ${processMutation.isPending ? 'animate-spin' : ''}`} />
                Process Pending ({stats.pending})
              </Button>
              <CreateNotificationDialog
                userId={userId}
                createMutation={createMutation}
                trigger={
                  <Button size='sm'>
                    <Plus className='h-4 w-4 mr-2' />
                    Create Notification
                  </Button>
                }
              />
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Statistics Cards */}
      <div className='grid gap-4 md:grid-cols-5'>
        <Card>
          <CardHeader className='pb-3'>
            <CardTitle className='text-sm font-medium text-muted-foreground'>Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='flex items-center gap-2'>
              <Bell className='h-4 w-4 text-muted-foreground' />
              <span className='text-2xl font-bold'>{stats.total}</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='pb-3'>
            <CardTitle className='text-sm font-medium text-muted-foreground'>Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='flex items-center gap-2'>
              <Clock className='h-4 w-4 text-yellow-500' />
              <span className='text-2xl font-bold'>{stats.pending}</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='pb-3'>
            <CardTitle className='text-sm font-medium text-muted-foreground'>Sent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='flex items-center gap-2'>
              <CheckCircle2 className='h-4 w-4 text-green-500' />
              <span className='text-2xl font-bold'>{stats.sent}</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='pb-3'>
            <CardTitle className='text-sm font-medium text-muted-foreground'>Failed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='flex items-center gap-2'>
              <XCircle className='h-4 w-4 text-red-500' />
              <span className='text-2xl font-bold'>{stats.failed}</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='pb-3'>
            <CardTitle className='text-sm font-medium text-muted-foreground'>Cancelled</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='flex items-center gap-2'>
              <AlertCircle className='h-4 w-4 text-gray-500' />
              <span className='text-2xl font-bold'>{stats.cancelled}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Notifications List */}
      <Card>
        <CardHeader>
          <div className='flex items-center justify-between'>
            <div>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>View all your notifications and their status</CardDescription>
            </div>
            <div className='flex items-center gap-2'>
              <Label htmlFor='status-filter' className='text-sm text-muted-foreground'>
                Filter:
              </Label>
              <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as typeof statusFilter)}>
                <SelectTrigger id='status-filter' className='w-[150px]'>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='ALL'>All Status</SelectItem>
                  <SelectItem value='PENDING'>Pending</SelectItem>
                  <SelectItem value='SENT'>Sent</SelectItem>
                  <SelectItem value='FAILED'>Failed</SelectItem>
                  <SelectItem value='CANCELLED'>Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className='space-y-4'>
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className='space-y-2'>
                  <Skeleton className='h-6 w-full' />
                  <Skeleton className='h-4 w-3/4' />
                </div>
              ))}
            </div>
          ) : filteredNotifications.length === 0 ? (
            <div className='flex flex-col items-center justify-center py-10'>
              <Bell className='h-12 w-12 text-muted-foreground mb-4' />
              <h3 className='text-lg font-semibold mb-2'>No notifications found</h3>
              <p className='text-sm text-muted-foreground'>
                {statusFilter === 'ALL'
                  ? 'You have no notifications yet.'
                  : `No ${statusFilter.toLowerCase()} notifications.`}
              </p>
            </div>
          ) : (
            <div className='space-y-4'>
              {filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className='rounded-lg border p-4 hover:bg-accent/50 transition-colors cursor-pointer'
                  onClick={() => setSelectedNotification(notification)}
                >
                  <div className='flex items-start justify-between gap-4'>
                    <div className='flex items-start gap-3 flex-1'>
                      <div className='mt-1'>{getNotificationIcon(notification.status)}</div>
                      <div className='flex-1 space-y-1'>
                        <div className='flex items-center gap-2'>
                          <h4 className='font-semibold'>{notification.subject}</h4>
                          <Badge variant={getStatusVariant(notification.status)}>{notification.status}</Badge>
                          <Badge variant='outline'>{notification.type}</Badge>
                        </div>
                        <p className='text-sm text-muted-foreground line-clamp-2'>{notification.content}</p>
                        <div className='flex items-center gap-4 text-xs text-muted-foreground'>
                          <div className='flex items-center gap-1'>
                            <Mail className='h-3 w-3' />
                            {notification.recipientEmail}
                          </div>
                          <div className='flex items-center gap-1'>
                            <Calendar className='h-3 w-3' />
                            {format(new Date(notification.createdAt), 'PPp')}
                          </div>
                          {notification.retryCount > 0 && (
                            <div className='flex items-center gap-1'>
                              <RefreshCw className='h-3 w-3' />
                              Retries: {notification.retryCount}
                            </div>
                          )}
                        </div>
                        {notification.errorMessage && (
                          <div className='mt-2 rounded-md bg-destructive/10 p-2 text-xs text-destructive'>
                            <AlertCircle className='h-3 w-3 inline mr-1' />
                            {notification.errorMessage}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Selected Notification Details Dialog */}
      {selectedNotification && (
        <NotificationDetailsDialog notification={selectedNotification} onClose={() => setSelectedNotification(null)} />
      )}
    </div>
  );
}

// Helper function to get status badge variant
function getStatusVariant(status: NotificationStatus): 'success' | 'warning' | 'destructive' | 'outline' {
  switch (status) {
    case 'SENT':
      return 'success';
    case 'PENDING':
      return 'warning';
    case 'FAILED':
      return 'destructive';
    case 'CANCELLED':
      return 'outline';
    default:
      return 'outline';
  }
}

// Helper function to get notification icon
function getNotificationIcon(status: NotificationStatus) {
  switch (status) {
    case 'SENT':
      return <CheckCircle2 className='h-5 w-5 text-green-500' />;
    case 'PENDING':
      return <Clock className='h-5 w-5 text-yellow-500' />;
    case 'FAILED':
      return <XCircle className='h-5 w-5 text-red-500' />;
    case 'CANCELLED':
      return <AlertCircle className='h-5 w-5 text-gray-500' />;
    default:
      return <Bell className='h-5 w-5 text-muted-foreground' />;
  }
}

// Create Notification Dialog Component
function CreateNotificationDialog({
  userId,
  createMutation,
  trigger,
}: {
  userId: number;
  createMutation: ReturnType<typeof useCreateNotificationMutation>;
  trigger: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    type: 'WELCOME' as NotificationType,
    subject: '',
    content: '',
    recipientEmail: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createMutation.mutate(
      {
        userId,
        ...formData,
      },
      {
        onSuccess: () => {
          setOpen(false);
          setFormData({
            type: 'WELCOME',
            subject: '',
            content: '',
            recipientEmail: '',
          });
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className='max-w-2xl'>
        <DialogHeader>
          <DialogTitle>Create New Notification</DialogTitle>
          <DialogDescription>Send a manual notification to a user</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='type'>Notification Type</Label>
            <Select
              value={formData.type}
              onValueChange={(value) => setFormData({ ...formData, type: value as NotificationType })}
            >
              <SelectTrigger id='type'>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {NotificationTypeEnum.options.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className='space-y-2'>
            <Label htmlFor='recipientEmail'>Recipient Email</Label>
            <Input
              id='recipientEmail'
              type='email'
              placeholder='user@example.com'
              value={formData.recipientEmail}
              onChange={(e) => setFormData({ ...formData, recipientEmail: e.target.value })}
              required
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='subject'>Subject</Label>
            <Input
              id='subject'
              placeholder='Enter notification subject'
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              required
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='content'>Content</Label>
            <Textarea
              id='content'
              placeholder='Enter notification content'
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              rows={5}
              required
            />
          </div>

          <Separator />

          <div className='flex justify-end gap-2'>
            <Button type='button' variant='outline' onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type='submit' disabled={createMutation.isPending}>
              {createMutation.isPending ? 'Creating...' : 'Create Notification'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// Notification Details Dialog Component
function NotificationDetailsDialog({ notification, onClose }: { notification: Notification; onClose: () => void }) {
  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className='max-w-3xl max-h-[90vh] overflow-y-auto'>
        <DialogHeader>
          <div className='flex items-center gap-3'>
            <div>{getNotificationIcon(notification.status)}</div>
            <div className='flex-1'>
              <DialogTitle className='text-xl'>{notification.subject}</DialogTitle>
              <DialogDescription className='flex items-center gap-2 mt-1'>
                <span>Notification ID: {notification.id}</span>
                <span>•</span>
                <span>User ID: {notification.userId}</span>
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className='space-y-6'>
          {/* Status and Type Badges */}
          <div className='flex items-center gap-2'>
            <Badge variant={getStatusVariant(notification.status)} className='text-sm'>
              {notification.status}
            </Badge>
            <Badge variant='outline' className='text-sm'>
              {notification.type}
            </Badge>
          </div>

          <Separator />

          {/* Notification Details Grid */}
          <div className='grid gap-6'>
            {/* Recipient */}
            <div className='space-y-2'>
              <div className='flex items-center gap-2'>
                <Mail className='h-4 w-4 text-muted-foreground' />
                <Label className='text-sm font-semibold'>Recipient</Label>
              </div>
              <p className='text-sm text-muted-foreground pl-6'>{notification.recipientEmail}</p>
            </div>

            {/* Subject */}
            <div className='space-y-2'>
              <Label className='text-sm font-semibold'>Subject</Label>
              <p className='text-sm text-muted-foreground pl-6'>{notification.subject}</p>
            </div>

            {/* Content */}
            <div className='space-y-2'>
              <Label className='text-sm font-semibold'>Content</Label>
              <div className='rounded-lg border bg-muted/50 p-4'>
                <p className='text-sm whitespace-pre-wrap'>{notification.content}</p>
              </div>
            </div>

            <Separator />

            {/* Timestamps */}
            <div className='grid gap-4 md:grid-cols-2'>
              <div className='space-y-2'>
                <div className='flex items-center gap-2'>
                  <Calendar className='h-4 w-4 text-muted-foreground' />
                  <Label className='text-sm font-semibold'>Created At</Label>
                </div>
                <p className='text-sm text-muted-foreground pl-6'>{format(new Date(notification.createdAt), 'PPpp')}</p>
              </div>

              {notification.sentAt && (
                <div className='space-y-2'>
                  <div className='flex items-center gap-2'>
                    <CheckCircle2 className='h-4 w-4 text-green-500' />
                    <Label className='text-sm font-semibold'>Sent At</Label>
                  </div>
                  <p className='text-sm text-muted-foreground pl-6'>{format(new Date(notification.sentAt), 'PPpp')}</p>
                </div>
              )}
            </div>

            {/* Retry Count */}
            {notification.retryCount > 0 && (
              <div className='space-y-2'>
                <div className='flex items-center gap-2'>
                  <RefreshCw className='h-4 w-4 text-muted-foreground' />
                  <Label className='text-sm font-semibold'>Retry Count</Label>
                </div>
                <p className='text-sm text-muted-foreground pl-6'>{notification.retryCount}</p>
              </div>
            )}

            {/* Error Message */}
            {notification.errorMessage && (
              <div className='space-y-2'>
                <div className='flex items-center gap-2'>
                  <AlertCircle className='h-4 w-4 text-destructive' />
                  <Label className='text-sm font-semibold text-destructive'>Error Message</Label>
                </div>
                <div className='rounded-lg border border-destructive/50 bg-destructive/10 p-4'>
                  <p className='text-sm text-destructive'>{notification.errorMessage}</p>
                </div>
              </div>
            )}
          </div>

          <Separator />

          {/* Actions */}
          <div className='flex justify-end gap-2'>
            <Button variant='outline' onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
