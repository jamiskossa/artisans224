"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Instagram, Facebook, Twitter, Youtube, Phone } from 'lucide-react';
import Link from 'next/link';

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

export default function ContactPage() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: "Message Sent!",
      description: "Thank you for reaching out. We'll get back to you soon.",
    });
    form.reset();
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold">Get In Touch</h1>
        <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
          We'd love to hear from you. Whether you have a question, a suggestion, or just want to say hello, feel free to reach out.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        <div>
            <h2 className="text-2xl font-headline font-semibold mb-4">Send us a message</h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Email</FormLabel>
                    <FormControl>
                      <Input placeholder="john.doe@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Message</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Tell us what's on your mind..." rows={6} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">Send Message</Button>
            </form>
          </Form>
        </div>
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-headline font-semibold mb-4">Connect with us</h2>
                <p className="text-muted-foreground mb-4">
                    For direct inquiries or to join our community, connect with us through these channels.
                </p>
                <Link href="https://api.whatsapp.com/send?phone=1234567890" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="w-full justify-start gap-3">
                        <Phone className="h-5 w-5 text-green-500" />
                        <span>Chat with us on WhatsApp</span>
                    </Button>
                </Link>
            </div>
            <div>
                <h3 className="text-xl font-headline font-semibold mb-4">Follow our journey</h3>
                 <div className="flex space-x-4">
                    <Link href="#" className="text-muted-foreground hover:text-primary">
                      <Instagram className="h-8 w-8" />
                    </Link>
                    <Link href="#" className="text-muted-foreground hover:text-primary">
                      <Facebook className="h-8 w-8" />
                    </Link>
                    <Link href="#" className="text-muted-foreground hover:text-primary">
                      <Twitter className="h-8 w-8" />
                    </Link>
                    <Link href="#" className="text-muted-foreground hover:text-primary">
                      <Youtube className="h-8 w-8" />
                    </Link>
                  </div>
            </div>
        </div>
      </div>
    </div>
  );
}
