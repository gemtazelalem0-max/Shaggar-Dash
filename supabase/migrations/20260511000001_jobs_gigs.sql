-- Add missing seller_id to orders table
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS seller_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE;

-- Create jobs table
CREATE TABLE public.jobs (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  employer_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  company text NOT NULL,
  salary_range text,
  type text, -- e.g. 'full-time', 'part-time', 'contract'
  city text,
  status text DEFAULT 'active' NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create applications table
CREATE TABLE public.applications (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  job_id uuid REFERENCES public.jobs(id) ON DELETE CASCADE NOT NULL,
  applicant_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  cover_note text,
  status text DEFAULT 'pending' NOT NULL, -- 'pending', 'accepted', 'rejected'
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create gigs table
CREATE TABLE public.gigs (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  freelancer_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  price numeric NOT NULL,
  delivery_days integer,
  category text,
  status text DEFAULT 'active' NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create gig_orders table
CREATE TABLE public.gig_orders (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  gig_id uuid REFERENCES public.gigs(id) ON DELETE CASCADE NOT NULL,
  client_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  freelancer_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  payment_status text DEFAULT 'pending' NOT NULL, -- 'pending', 'paid', 'refunded'
  delivery_status text DEFAULT 'pending' NOT NULL, -- 'pending', 'in_progress', 'delivered', 'completed'
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gigs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gig_orders ENABLE ROW LEVEL SECURITY;

-- Jobs Policies
CREATE POLICY "Jobs are viewable by everyone." ON public.jobs FOR SELECT USING (true);
CREATE POLICY "Employers can insert their own jobs." ON public.jobs FOR INSERT WITH CHECK (auth.uid() = employer_id);
CREATE POLICY "Employers can update their own jobs." ON public.jobs FOR UPDATE USING (auth.uid() = employer_id);
CREATE POLICY "Employers can delete their own jobs." ON public.jobs FOR DELETE USING (auth.uid() = employer_id);

-- Applications Policies
CREATE POLICY "Employers can view applications for their jobs." 
  ON public.applications FOR SELECT 
  USING (auth.uid() IN (SELECT employer_id FROM public.jobs WHERE id = job_id));
CREATE POLICY "Applicants can view their own applications." 
  ON public.applications FOR SELECT 
  USING (auth.uid() = applicant_id);
CREATE POLICY "Applicants can insert their own applications." 
  ON public.applications FOR INSERT 
  WITH CHECK (auth.uid() = applicant_id);
CREATE POLICY "Employers can update application status." 
  ON public.applications FOR UPDATE 
  USING (auth.uid() IN (SELECT employer_id FROM public.jobs WHERE id = job_id));

-- Gigs Policies
CREATE POLICY "Gigs are viewable by everyone." ON public.gigs FOR SELECT USING (true);
CREATE POLICY "Freelancers can insert their own gigs." ON public.gigs FOR INSERT WITH CHECK (auth.uid() = freelancer_id);
CREATE POLICY "Freelancers can update their own gigs." ON public.gigs FOR UPDATE USING (auth.uid() = freelancer_id);
CREATE POLICY "Freelancers can delete their own gigs." ON public.gigs FOR DELETE USING (auth.uid() = freelancer_id);

-- Gig Orders Policies
CREATE POLICY "Clients and freelancers can view their gig orders." 
  ON public.gig_orders FOR SELECT 
  USING (auth.uid() = client_id OR auth.uid() = freelancer_id);
CREATE POLICY "Clients can insert gig orders." 
  ON public.gig_orders FOR INSERT 
  WITH CHECK (auth.uid() = client_id);
CREATE POLICY "Freelancers can update delivery status." 
  ON public.gig_orders FOR UPDATE 
  USING (auth.uid() = freelancer_id);
