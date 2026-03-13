"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/form-field/form-input";
import { FormTextarea } from "@/components/form-field/form-textarea";
import { contactSchema, ContactValues } from "@/validations/contact.schema";
import { useSubmitContact } from "@/hooks/mutation/use-contact";
import { useState } from "react";
import { ContactSuccessView } from "./contact-success-view";

export function ContactForm() {
  const [isSuccess, setIsSuccess] = useState(false);
  const form = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const { mutate: submitContact, isPending, error } = useSubmitContact();

  function onSubmit(data: ContactValues) {
    submitContact(data, {
      onSuccess: () => {
        setIsSuccess(true);
        form.reset();
        setTimeout(() => setIsSuccess(false), 5000);
      },
    });
  }
  return (
    <Card className="border-border/50 bg-card overflow-hidden">
      <CardContent className="p-8">
        {isSuccess ? (
          <ContactSuccessView onReset={() => setIsSuccess(false)} />
        ) : (
// ... rest of the form
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {error && (
                <div className="flex items-center gap-2 rounded-xl border border-destructive/20 bg-destructive/10 p-4 text-xs text-destructive animate-in fade-in slide-in-from-top-1 duration-300">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <p className="font-medium">
                    {(error as any).response?.data?.error || "Failed to send message. Please try again."}
                  </p>
                </div>
              )}

              <div className="grid gap-6 sm:grid-cols-2">
                <FormInput
                  name="name"
                  label="Name"
                  placeholder="Your name"
                  disabled={isPending}
                  className="bg-muted/30 border-border/50 focus-visible:ring-primary h-11"
                />
                <FormInput
                  name="email"
                  label="Email"
                  type="email"
                  placeholder="Your email address"
                  disabled={isPending}
                  className="bg-muted/30 border-border/50 focus-visible:ring-primary h-11"
                />
              </div>

              <FormInput
                name="subject"
                label="Subject"
                placeholder="What is this about?"
                disabled={isPending}
                className="bg-muted/30 border-border/50 focus-visible:ring-primary h-11"
              />

              <FormTextarea
                name="message"
                label="Message"
                placeholder="Your message details..."
                rows={6}
                disabled={isPending}
                className="bg-muted/30 border-border/50 focus-visible:ring-primary h-auto py-3"
              />

              <Button type="submit" size="lg" className="w-full h-12 shadow-sm" disabled={isPending}>
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </Form>
        )}
      </CardContent>
    </Card>
  );
}
