import { useState } from 'react';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
  DialogTrigger,
} from '../ui/dialog';
import { VehiclesTableQuery } from './use-vehicles-queries';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import NumberInput from '../number-input';

interface VehicleFiltersDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  query: VehiclesTableQuery[0];
  setQuery: VehiclesTableQuery[1];
  children: React.ReactNode;
}

export function VehicleFiltersDialog({ open, onOpenChange, query, setQuery, children }: VehicleFiltersDialogProps) {
  const [status, setStatus] = useState(query.status ?? 'all');
  const [minPrice, setMinPrice] = useState(query.minPrice ?? undefined);
  const [maxPrice, setMaxPrice] = useState(query.maxPrice ?? undefined);
  const [yearFrom, setYearFrom] = useState(query.yearFrom ?? undefined);
  const [yearTo, setYearTo] = useState(query.yearTo ?? undefined);
  const [featured, setFeatured] = useState(query.featured ?? undefined);
  const [hasImages, setHasImages] = useState(query.hasImages ?? undefined);

  const handleApplyFilters = () => {
    setQuery({
      status: status === 'all' ? undefined : status,
      minPrice: minPrice ?? null,
      maxPrice: maxPrice ?? null,
      yearFrom: yearFrom ?? null,
      yearTo: yearTo ?? null,
      featured: featured ?? null,
      hasImages: hasImages ?? null,
    });

    onOpenChange(false);
  };

  const getNextTenYearsFromNow = new Date().getFullYear() + 10;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Filters</DialogTitle>
          <DialogDescription>Filter vehicles by various criteria</DialogDescription>
        </DialogHeader>
        <div className='space-y-4'>
          <Select
            value={status ?? 'all'}
            onValueChange={(value) =>
              setStatus(
                value as
                  | 'all'
                  | 'PENDING'
                  | 'APPROVED'
                  | 'AVAILABLE'
                  | 'OCCUPIED'
                  | 'REJECTED'
                  | 'BLOCKED'
                  | 'INACTIVE'
                  | 'DISABLED'
              )
            }
          >
            <SelectTrigger className='w-40'>
              <SelectValue placeholder='Status' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>All Statuses</SelectItem>
              <SelectItem value='PENDING'>Pending</SelectItem>
              <SelectItem value='APPROVED'>Approved</SelectItem>
              <SelectItem value='AVAILABLE'>Available</SelectItem>
              <SelectItem value='OCCUPIED'>Occupied</SelectItem>
              <SelectItem value='REJECTED'>Rejected</SelectItem>
              <SelectItem value='BLOCKED'>Blocked</SelectItem>
              <SelectItem value='INACTIVE'>Inactive</SelectItem>
              <SelectItem value='DISABLED'>Disabled</SelectItem>
            </SelectContent>
          </Select>
          <div className='flex items-center gap-2 border p-4'>
            <Switch id='featured' checked={featured} onCheckedChange={setFeatured} />
            <Label htmlFor='featured'>Featured</Label>
          </div>
          <div className='flex items-center gap-2 border p-4'>
            <Switch id='hasImages' checked={hasImages} onCheckedChange={setHasImages} />
            <Label htmlFor='hasImages'>Has Images</Label>
          </div>
          <NumberInput
            placeholder='Min Price'
            min={0}
            max={maxPrice ?? Infinity}
            value={minPrice}
            onChange={(value) => setMinPrice(value ?? undefined)}
          />
          <NumberInput
            placeholder='Max Price'
            min={minPrice ?? 0}
            value={maxPrice}
            onChange={(value) => setMaxPrice(value ?? undefined)}
          />
          <NumberInput
            placeholder='Year From'
            min={1800}
            max={Math.min(yearTo ?? Infinity, getNextTenYearsFromNow)}
            value={yearFrom}
            onChange={(value) => setYearFrom(value ?? undefined)}
          />
          <NumberInput
            placeholder='Year To'
            min={yearFrom ?? 1800}
            max={getNextTenYearsFromNow}
            value={yearTo}
            onChange={(value) => setYearTo(value ?? undefined)}
          />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant='outline'>Close</Button>
          </DialogClose>
          <Button onClick={handleApplyFilters}>Apply Filters</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
