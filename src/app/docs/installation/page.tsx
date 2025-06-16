"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { 
  HardDrive, 
  Monitor, 
  Cpu, 
  Wifi,
  Download,
  Shield,
  CheckCircle,
  AlertTriangle,
  Info,
  Play,
  Settings,
  Terminal,
  FileText,
  Disc,
  Clock,
  ArrowRight,
  ExternalLink,
  Users
} from "lucide-react"
import { Usb as USB } from "lucide-react"

interface Step {
  id: string
  title: string
  description: string
  time: string
  difficulty: "Easy" | "Medium" | "Hard"
  details: string[]
  tips?: string[]
  warnings?: string[]
}

interface InstallMethod {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  time: string
  difficulty: string
  requirements: string[]
  steps: Step[]
}

const installMethods: InstallMethod[] = [
  {
    id: "fresh",
    name: "Fresh Installation",
    description: "Clean installation on a new or wiped drive",
    icon: <HardDrive className="h-6 w-6" />,
    time: "30-45 minutes",
    difficulty: "Easy",
    requirements: [
      "Empty hard drive or willingness to wipe existing data",
      "USB drive (8GB minimum) or DVD",
      "Stable internet connection",
      "Computer that meets system requirements"
    ],
    steps: [
      {
        id: "download",
        title: "Download AxylOS",
        description: "Get the latest ISO file",
        time: "5-15 minutes",
        difficulty: "Easy",
        details: [
          "Visit the AxylOS download page",
          "Choose the latest stable release",
          "Download the ISO file (approximately 2.8GB)",
          "Verify the download using provided checksums"
        ],
        tips: [
          "Use a fast internet connection for quicker downloads",
          "Always verify checksums to ensure file integrity"
        ]
      },
      {
        id: "create-media",
        title: "Create Installation Media",
        description: "Make a bootable USB drive or DVD",
        time: "10-15 minutes",
        difficulty: "Easy",
        details: [
          "Insert a USB drive (8GB minimum) or blank DVD",
          "Download a tool like Rufus (Windows), Etcher (cross-platform), or use dd (Linux)",
          "Flash the ISO to your USB drive or burn to DVD",
          "Safely eject the media when complete"
        ],
        tips: [
          "USB drives are faster and more reliable than DVDs",
          "Make sure to backup any important data on the USB drive first"
        ],
        warnings: [
          "This will erase all data on the USB drive or DVD"
        ]
      },
      {
        id: "boot-setup",
        title: "Boot from Installation Media",
        description: "Configure your computer to boot from USB/DVD",
        time: "5-10 minutes",
        difficulty: "Medium",
        details: [
          "Insert the installation media into your computer",
          "Restart your computer",
          "Access BIOS/UEFI settings (usually F2, F12, Del, or Esc during startup)",
          "Change boot order to prioritize USB/DVD",
          "Save settings and restart"
        ],
        tips: [
          "The key to access BIOS varies by manufacturer",
          "Look for boot menu options as an alternative to changing BIOS settings"
        ]
      },
      {
        id: "start-installer",
        title: "Start the Installation",
        description: "Boot into the AxylOS live environment",
        time: "2-3 minutes",
        difficulty: "Easy",
        details: [
          "Select 'Boot AxylOS' from the boot menu",
          "Wait for the system to load",
          "You'll see the AxylOS desktop with an installer icon",
          "Click the installer icon to begin installation"
        ]
      },
      {
        id: "partitioning",
        title: "Disk Partitioning",
        description: "Set up your hard drive",
        time: "5-10 minutes",
        difficulty: "Medium",
        details: [
          "Choose installation type (Erase disk, Manual partitioning, etc.)",
          "Select the target drive for installation",
          "Review partition layout",
          "Confirm partitioning scheme"
        ],
        tips: [
          "For beginners, 'Erase disk and install AxylOS' is the simplest option",
          "Manual partitioning gives more control but requires knowledge"
        ],
        warnings: [
          "This will permanently delete all data on the selected drive"
        ]
      },
      {
        id: "user-setup",
        title: "User Account Setup",
        description: "Create your user account",
        time: "2-3 minutes",
        difficulty: "Easy",
        details: [
          "Enter your full name",
          "Choose a username",
          "Set a strong password",
          "Confirm password",
          "Optionally encrypt your home folder"
        ],
        tips: [
          "Use a strong password with mixed characters",
          "Write down your password in a safe place"
        ]
      },
      {
        id: "installation",
        title: "Installing System",
        description: "Wait for files to copy",
        time: "15-25 minutes",
        difficulty: "Easy",
        details: [
          "The installer will copy files to your hard drive",
          "Configure system settings",
          "Install bootloader",
          "Progress will be shown on screen"
        ],
        tips: [
          "Don't interrupt the installation process",
          "This is a good time to read the user manual"
        ]
      },
      {
        id: "completion",
        title: "Complete Installation",
        description: "Finish setup and reboot",
        time: "2-3 minutes",
        difficulty: "Easy",
        details: [
          "Installation completed successfully message appears",
          "Remove installation media when prompted",
          "Click 'Restart Now' button",
          "Your computer will restart into AxylOS"
        ]
      }
    ]
  },
  {
    id: "dual-boot",
    name: "Dual Boot Installation",
    description: "Install alongside Windows or another OS",
    icon: <Monitor className="h-6 w-6" />,
    time: "45-60 minutes",
    difficulty: "Medium",
    requirements: [
      "Existing Windows installation with free space",
      "At least 20GB of unallocated disk space",
      "USB drive (8GB minimum) or DVD",
      "Backup of important Windows data"
    ],
    steps: [
      {
        id: "backup",
        title: "Backup Important Data",
        description: "Protect your existing data",
        time: "Variable",
        difficulty: "Easy",
        details: [
          "Backup all important files from Windows",
          "Create a Windows recovery drive",
          "Note down Windows license key",
          "Ensure you have Windows installation media"
        ],
        warnings: [
          "Always backup before attempting dual boot setup"
        ]
      },
      {
        id: "shrink-partition",
        title: "Shrink Windows Partition",
        description: "Make space for AxylOS",
        time: "10-20 minutes",
        difficulty: "Medium",
        details: [
          "Open Windows Disk Management",
          "Right-click on C: drive",
          "Select 'Shrink Volume'",
          "Shrink by at least 25GB (40GB recommended)"
        ],
        tips: [
          "Defragment Windows drive first for better results",
          "Leave some extra space for both operating systems"
        ]
      },
      {
        id: "disable-fast-startup",
        title: "Disable Fast Startup",
        description: "Prevent Windows boot issues",
        time: "2-3 minutes",
        difficulty: "Easy",
        details: [
          "Open Windows Power Options",
          "Click 'Choose what the power buttons do'",
          "Click 'Change settings that are currently unavailable'",
          "Uncheck 'Turn on fast startup'"
        ]
      },
      {
        id: "dual-boot-install",
        title: "Install AxylOS",
        description: "Install in the free space",
        time: "20-30 minutes",
        difficulty: "Medium",
        details: [
          "Boot from AxylOS installation media",
          "Choose 'Install alongside Windows'",
          "Select the amount of space for AxylOS",
          "Follow the installation process",
          "Configure dual boot menu"
        ]
      }
    ]
  }
]

const systemRequirements = [
  {
    component: "Processor",
    minimum: "64-bit processor with SSE2 support",
    recommended: "Dual-core 2GHz or faster",
    icon: <Cpu className="h-5 w-5" />
  },
  {
    component: "Memory (RAM)",
    minimum: "2GB",
    recommended: "4GB or more",
    icon: <Monitor className="h-5 w-5" />
  },
  {
    component: "Storage",
    minimum: "20GB available space",
    recommended: "40GB or more",
    icon: <HardDrive className="h-5 w-5" />
  },
  {
    component: "Graphics",
    minimum: "DirectX 9 capable",
    recommended: "DirectX 11 or newer",
    icon: <Monitor className="h-5 w-5" />
  },
  {
    component: "Network",
    minimum: "Internet connection for updates",
    recommended: "Broadband connection",
    icon: <Wifi className="h-5 w-5" />
  }
]

export default function InstallationPage() {
  const [selectedMethod, setSelectedMethod] = useState<InstallMethod>(installMethods[0])
  const [completedSteps, setCompletedSteps] = useState<string[]>([])

  const toggleStepCompletion = (stepId: string) => {
    if (completedSteps.includes(stepId)) {
      setCompletedSteps(completedSteps.filter(id => id !== stepId))
    } else {
      setCompletedSteps([...completedSteps, stepId])
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "text-green-600 bg-green-100"
      case "Medium": return "text-yellow-600 bg-yellow-100"
      case "Hard": return "text-red-600 bg-red-100"
      default: return "text-gray-600 bg-gray-100"
    }
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            <Settings className="h-3 w-3 mr-1" />
            Installation Guide
          </Badge>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Install AxylOS
          </h1>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Follow our comprehensive guide to install AxylOS on your computer. 
            Choose the installation method that best fits your needs.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          <Button asChild>
            <Link href="/download">
              <Download className="h-4 w-4 mr-2" />
              Download AxylOS
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/support">
              <Shield className="h-4 w-4 mr-2" />
              Get Help
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/docs/system-requirements">
              <Info className="h-4 w-4 mr-2" />
              Check Compatibility
            </Link>
          </Button>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Installation Method Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Choose Installation Method</CardTitle>
                <CardDescription>
                  Select the type of installation that matches your needs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {installMethods.map((method) => (
                    <div
                      key={method.id}
                      className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                        selectedMethod.id === method.id
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      }`}
                      onClick={() => setSelectedMethod(method)}
                    >
                      <div className="flex items-start gap-3">
                        <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          {method.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold mb-1">{method.name}</h3>
                          <p className="text-sm text-muted-foreground mb-2">
                            {method.description}
                          </p>
                          <div className="flex items-center gap-4 text-xs">
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {method.time}
                            </span>
                            <Badge variant="secondary" className={`text-xs ${getDifficultyColor(method.difficulty)}`}>
                              {method.difficulty}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Prerequisites */}
            <Card>
              <CardHeader>
                <CardTitle>Prerequisites</CardTitle>
                <CardDescription>
                  Before starting the {selectedMethod.name.toLowerCase()}, make sure you have:
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {selectedMethod.requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Installation Steps */}
            <Card>
              <CardHeader>
                <CardTitle>Installation Steps</CardTitle>
                <CardDescription>
                  Follow these steps for {selectedMethod.name.toLowerCase()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {selectedMethod.steps.map((step, index) => (
                    <div key={step.id} className="relative">
                      {/* Step connector line */}
                      {index < selectedMethod.steps.length - 1 && (
                        <div className="absolute left-4 top-12 w-0.5 h-16 bg-border"></div>
                      )}
                      
                      <div className="flex gap-4">
                        {/* Step number */}
                        <div 
                          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium cursor-pointer transition-colors ${
                            completedSteps.includes(step.id)
                              ? 'bg-green-600 text-white'
                              : 'bg-primary text-primary-foreground'
                          }`}
                          onClick={() => toggleStepCompletion(step.id)}
                        >
                          {completedSteps.includes(step.id) ? (
                            <CheckCircle className="h-4 w-4" />
                          ) : (
                            index + 1
                          )}
                        </div>
                        
                        {/* Step content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold">{step.title}</h3>
                            <Badge variant="outline" className="text-xs">
                              {step.time}
                            </Badge>
                            <Badge variant="secondary" className={`text-xs ${getDifficultyColor(step.difficulty)}`}>
                              {step.difficulty}
                            </Badge>
                          </div>
                          
                          <p className="text-muted-foreground mb-3">{step.description}</p>
                          
                          <Accordion type="single" collapsible>
                            <AccordionItem value={step.id}>
                              <AccordionTrigger className="text-sm">
                                View detailed instructions
                              </AccordionTrigger>
                              <AccordionContent>
                                <div className="space-y-4 pt-2">
                                  <div>
                                    <h4 className="font-medium mb-2">Instructions:</h4>
                                    <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                                      {step.details.map((detail, idx) => (
                                        <li key={idx}>{detail}</li>
                                      ))}
                                    </ol>
                                  </div>
                                  
                                  {step.tips && (
                                    <Alert>
                                      <Info className="h-4 w-4" />
                                      <AlertDescription>
                                        <strong>Tips:</strong>
                                        <ul className="list-disc list-inside mt-1">
                                          {step.tips.map((tip, idx) => (
                                            <li key={idx}>{tip}</li>
                                          ))}
                                        </ul>
                                      </AlertDescription>
                                    </Alert>
                                  )}
                                  
                                  {step.warnings && (
                                    <Alert variant="destructive">
                                      <AlertTriangle className="h-4 w-4" />
                                      <AlertDescription>
                                        <strong>Warning:</strong>
                                        <ul className="list-disc list-inside mt-1">
                                          {step.warnings.map((warning, idx) => (
                                            <li key={idx}>{warning}</li>
                                          ))}
                                        </ul>
                                      </AlertDescription>
                                    </Alert>
                                  )}
                                </div>
                              </AccordionContent>
                            </AccordionItem>
                          </Accordion>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Troubleshooting */}
            <Card>
              <CardHeader>
                <CardTitle>Common Issues & Solutions</CardTitle>
                <CardDescription>
                  Having problems during installation? Here are some common solutions.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible>
                  <AccordionItem value="boot-issues">
                    <AccordionTrigger>Computer won&apos;t boot from USB/DVD</AccordionTrigger>
                    <AccordionContent>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        <li>Check that the installation media was created correctly</li>
                        <li>Try different USB ports (USB 2.0 ports often work better)</li>
                        <li>Disable Secure Boot in UEFI settings temporarily</li>
                        <li>Enable Legacy/CSM mode if available</li>
                        <li>Try recreating the installation media with a different tool</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="partition-errors">
                    <AccordionTrigger>Partitioning errors</AccordionTrigger>
                    <AccordionContent>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        <li>Ensure the target drive has enough free space</li>
                        <li>Check that the drive isn&apos;t currently mounted or in use</li>
                        <li>For dual boot: make sure Windows is properly shut down (not hibernated)</li>
                        <li>Consider using GParted to manually prepare partitions</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="wifi-not-working">
                    <AccordionTrigger>WiFi not detected during installation</AccordionTrigger>
                    <AccordionContent>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        <li>Use an ethernet connection during installation if possible</li>
                        <li>Some WiFi adapters require proprietary drivers</li>
                        <li>After installation, run: sudo pacman -S linux-firmware</li>
                        <li>Check if your WiFi adapter is supported by Linux</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="installation-hangs">
                    <AccordionTrigger>Installation hangs or freezes</AccordionTrigger>
                    <AccordionContent>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        <li>Check system requirements - insufficient RAM can cause issues</li>
                        <li>Try installation without internet connection initially</li>
                        <li>Boot with &quot;nomodeset&quot; kernel parameter for graphics issues</li>
                        <li>Test your RAM with memtest86+ if problems persist</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* System Requirements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Cpu className="h-5 w-5" />
                  System Requirements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {systemRequirements.map((req, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center gap-2">
                      {req.icon}
                      <span className="font-medium text-sm">{req.component}</span>
                    </div>
                    <div className="text-xs text-muted-foreground ml-7">
                      <div>Min: {req.minimum}</div>
                      <div>Rec: {req.recommended}</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Tools Needed */}
            <Card>
              <CardHeader>
                <CardTitle>Tools You&apos;ll Need</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3 p-2 border rounded">
                  <USB className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium text-sm">USB Flash Drive</p>
                    <p className="text-xs text-muted-foreground">8GB minimum</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-2 border rounded">
                  <Download className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium text-sm">Flashing Tool</p>
                    <p className="text-xs text-muted-foreground">Rufus, Etcher, or dd</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-2 border rounded">
                  <Shield className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium text-sm">Backup Solution</p>
                    <p className="text-xs text-muted-foreground">For important data</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href="/download">
                    <Download className="h-4 w-4 mr-2" />
                    Download AxylOS
                  </Link>
                </Button>
                
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href="/docs/post-installation">
                    <Settings className="h-4 w-4 mr-2" />
                    Post-Installation Setup
                  </Link>
                </Button>
                
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href="/support">
                    <Shield className="h-4 w-4 mr-2" />
                    Get Help
                  </Link>
                </Button>
                
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href="https://wiki.archlinux.org/title/Installation_guide" target="_blank">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Arch Wiki
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Progress Tracker */}
            <Card>
              <CardHeader>
                <CardTitle>Your Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Steps Completed</span>
                    <span>{completedSteps.length}/{selectedMethod.steps.length}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ 
                        width: `${(completedSteps.length / selectedMethod.steps.length) * 100}%` 
                      }}
                    />
                  </div>
                  {completedSteps.length === selectedMethod.steps.length && (
                    <p className="text-sm text-green-600 font-medium">
                      🎉 Installation Complete!
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Video Tutorial */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Play className="h-5 w-5" />
              Video Tutorial
            </CardTitle>
            <CardDescription>
              Watch our step-by-step video guide for installing AxylOS
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Play className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground mb-4">Video tutorial coming soon</p>
                <Button variant="outline" asChild>
                  <Link href="https://youtube.com/@axyl-os" target="_blank">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Visit Our YouTube Channel
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>After Installation</CardTitle>
            <CardDescription>
              What to do once AxylOS is installed on your computer
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Settings className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Initial Setup</h3>
                <p className="text-sm text-muted-foreground">
                  Configure your system settings and preferences
                </p>
              </div>
              
              <div className="text-center">
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Download className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Install Software</h3>
                <p className="text-sm text-muted-foreground">
                  Add your favorite applications and tools
                </p>
              </div>
              
              <div className="text-center">
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Join Community</h3>
                <p className="text-sm text-muted-foreground">
                  Connect with other AxylOS users for help and tips
                </p>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <Button asChild>
                <Link href="/docs/post-installation">
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Post-Installation Guide
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}