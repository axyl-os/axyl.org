"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { 
  Download, 
  Shield, 
  HardDrive, 
  Cpu, 
  Monitor,
  Wifi,
  CheckCircle,
  AlertTriangle,
  ExternalLink,
  Copy,

  Clock,
  FileText,
  Hash
} from "lucide-react"

interface Release {
  version: string
  codename: string
  releaseDate: string
  isLatest: boolean
  isLTS: boolean
  downloadSize: string
  isoUrl: string
  torrentUrl: string
  checksumSha256: string
  checksumMd5: string
  releaseNotes: string
  systemRequirements: {
    architecture: string[]
    ram: string
    storage: string
    processor: string
  }
}

interface Mirror {
  id: string
  name: string
  location: string
  url: string
  speed: string
  status: "online" | "offline" | "maintenance"
}

const releases: Release[] = [
  {
    version: "2024.2",
    codename: "Aurora",
    releaseDate: "2024-02-15",
    isLatest: true,
    isLTS: false,
    downloadSize: "2.8 GB",
    isoUrl: "https://releases.axyl.org/2024.2/axyl-2024.2-x86_64.iso",
    torrentUrl: "https://releases.axyl.org/2024.2/axyl-2024.2-x86_64.iso.torrent",
    checksumSha256: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    checksumMd5: "d41d8cd98f00b204e9800998ecf8427e",
    releaseNotes: "/blog/release-2024-2-aurora",
    systemRequirements: {
      architecture: ["x86_64"],
      ram: "2 GB minimum, 4 GB recommended",
      storage: "20 GB available space",
      processor: "64-bit processor with SSE2 support"
    }
  },
  {
    version: "2024.1",
    codename: "Zenith",
    releaseDate: "2024-01-15",
    isLatest: false,
    isLTS: true,
    downloadSize: "2.6 GB",
    isoUrl: "https://releases.axyl.org/2024.1/axyl-2024.1-x86_64.iso",
    torrentUrl: "https://releases.axyl.org/2024.1/axyl-2024.1-x86_64.iso.torrent",
    checksumSha256: "a1b2c3d4e5f6789012345678901234567890123456789012345678901234567890",
    checksumMd5: "12345678901234567890123456789012",
    releaseNotes: "/blog/release-2024-1-zenith",
    systemRequirements: {
      architecture: ["x86_64"],
      ram: "2 GB minimum, 4 GB recommended",
      storage: "18 GB available space",
      processor: "64-bit processor with SSE2 support"
    }
  }
]

const mirrors: Mirror[] = [
  {
    id: "primary",
    name: "Primary Server",
    location: "United States",
    url: "https://releases.axyl.org",
    speed: "1 Gbps",
    status: "online"
  },
  {
    id: "eu-mirror",
    name: "European Mirror",
    location: "Germany",
    url: "https://eu.releases.axyl.org",
    speed: "500 Mbps",
    status: "online"
  },
  {
    id: "asia-mirror",
    name: "Asian Mirror",
    location: "Singapore",
    url: "https://asia.releases.axyl.org",
    speed: "300 Mbps",
    status: "online"
  },
  {
    id: "community-mirror",
    name: "Community Mirror",
    location: "Canada",
    url: "https://ca.releases.axyl.org",
    speed: "200 Mbps",
    status: "maintenance"
  }
]

export default function DownloadPage() {
  const [selectedRelease, setSelectedRelease] = useState<Release>(releases[0])
  const [copiedChecksum, setCopiedChecksum] = useState<string | null>(null)
  const [downloadStarted, setDownloadStarted] = useState(false)

  const handleDownload = (url: string, filename: string) => {
    setDownloadStarted(true)
    
    // Create a temporary link element to trigger download
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    // Track download analytics (you can integrate with your analytics service)
    if (typeof window !== 'undefined') {
      // Example: gtag('event', 'download', { version: selectedRelease.version })
      console.log(`Download started: ${filename}`)
    }

    setTimeout(() => setDownloadStarted(false), 3000)
  }

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedChecksum(type)
      setTimeout(() => setCopiedChecksum(null), 2000)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }



  const getStatusIcon = (status: Mirror['status']) => {
    switch (status) {
      case 'online': return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'offline': return <AlertTriangle className="h-4 w-4 text-red-600" />
      case 'maintenance': return <Clock className="h-4 w-4 text-yellow-600" />
    }
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            <Download className="h-3 w-3 mr-1" />
            Download
          </Badge>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Download AxylOS
          </h1>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get the latest version of AxylOS and experience the perfect balance of power and simplicity.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Download Section */}
          <div className="lg:col-span-2 space-y-8">
            {/* Release Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Select Release</CardTitle>
                <CardDescription>
                  Choose the version of AxylOS you want to download
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {releases.map((release) => (
                    <div
                      key={release.version}
                      className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                        selectedRelease.version === release.version
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      }`}
                      onClick={() => setSelectedRelease(release)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold">
                              AxylOS {release.version} "{release.codename}"
                            </h3>
                            {release.isLatest && (
                              <Badge variant="default">Latest</Badge>
                            )}
                            {release.isLTS && (
                              <Badge variant="secondary">LTS</Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Released {new Date(release.releaseDate).toLocaleDateString()} • {release.downloadSize}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">{release.systemRequirements.architecture.join(', ')}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Download Options */}
            <Card>
              <CardHeader>
                <CardTitle>Download Options</CardTitle>
                <CardDescription>
                  Multiple ways to download AxylOS {selectedRelease.version}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="direct" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="direct">Direct Download</TabsTrigger>
                    <TabsTrigger value="torrent">Torrent</TabsTrigger>
                    <TabsTrigger value="mirrors">Mirrors</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="direct" className="space-y-4">
                    <div className="flex flex-col gap-4">
                      <Button
                        size="lg"
                        className="w-full"
                        onClick={() => handleDownload(
                          selectedRelease.isoUrl,
                          `axyl-${selectedRelease.version}-x86_64.iso`
                        )}
                        disabled={downloadStarted}
                      >
                        <Download className="h-5 w-5 mr-2" />
                        {downloadStarted ? 'Download Starting...' : `Download AxylOS ${selectedRelease.version}`}
                      </Button>
                      
                      <Alert>
                        <Shield className="h-4 w-4" />
                        <AlertDescription>
                          Always verify your download using the checksums below to ensure integrity.
                        </AlertDescription>
                      </Alert>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="torrent" className="space-y-4">
                    <div className="flex flex-col gap-4">
                      <Button
                        variant="outline"
                        size="lg"
                        className="w-full"
                        onClick={() => handleDownload(
                          selectedRelease.torrentUrl,
                          `axyl-${selectedRelease.version}-x86_64.iso.torrent`
                        )}
                      >
                        <Download className="h-5 w-5 mr-2" />
                        Download Torrent File
                      </Button>
                      
                      <Alert>
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription>
                          Torrent downloads help distribute the load and often provide faster speeds.
                          You&apos;ll need a BitTorrent client to use this option.
                        </AlertDescription>
                      </Alert>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="mirrors" className="space-y-4">
                    <div className="grid gap-3">
                      {mirrors.map((mirror) => (
                        <div
                          key={mirror.id}
                          className="flex items-center justify-between p-3 border rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            {getStatusIcon(mirror.status)}
                            <div>
                              <p className="font-medium">{mirror.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {mirror.location} • {mirror.speed}
                              </p>
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            disabled={mirror.status !== 'online'}
                            onClick={() => handleDownload(
                              `${mirror.url}/axyl-${selectedRelease.version}-x86_64.iso`,
                              `axyl-${selectedRelease.version}-x86_64.iso`
                            )}
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Checksums */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Hash className="h-5 w-5" />
                  File Verification
                </CardTitle>
                <CardDescription>
                  Verify your download integrity using these checksums
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div>
                      <p className="font-medium text-sm">SHA256</p>
                      <p className="font-mono text-xs text-muted-foreground break-all">
                        {selectedRelease.checksumSha256}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(selectedRelease.checksumSha256, 'sha256')}
                    >
                      <Copy className="h-4 w-4" />
                      {copiedChecksum === 'sha256' ? 'Copied!' : 'Copy'}
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div>
                      <p className="font-medium text-sm">MD5</p>
                      <p className="font-mono text-xs text-muted-foreground">
                        {selectedRelease.checksumMd5}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(selectedRelease.checksumMd5, 'md5')}
                    >
                      <Copy className="h-4 w-4" />
                      {copiedChecksum === 'md5' ? 'Copied!' : 'Copy'}
                    </Button>
                  </div>
                </div>
                
                <Alert>
                  <Shield className="h-4 w-4" />
                  <AlertDescription>
                    To verify: <code className="bg-muted px-1 rounded">sha256sum axyl-{selectedRelease.version}-x86_64.iso</code>
                  </AlertDescription>
                </Alert>
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
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Cpu className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Processor</p>
                      <p className="text-xs text-muted-foreground">
                        {selectedRelease.systemRequirements.processor}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Monitor className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Memory</p>
                      <p className="text-xs text-muted-foreground">
                        {selectedRelease.systemRequirements.ram}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <HardDrive className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Storage</p>
                      <p className="text-xs text-muted-foreground">
                        {selectedRelease.systemRequirements.storage}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Wifi className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Network</p>
                      <p className="text-xs text-muted-foreground">
                        Internet connection recommended
                      </p>
                    </div>
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
                  <Link href="/docs/installation">
                    <FileText className="h-4 w-4 mr-2" />
                    Installation Guide
                  </Link>
                </Button>
                
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href={selectedRelease.releaseNotes}>
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Release Notes
                  </Link>
                </Button>
                
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href="/docs/system-requirements">
                    <Cpu className="h-4 w-4 mr-2" />
                    Compatibility Check
                  </Link>
                </Button>
                
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href="/support">
                    <Shield className="h-4 w-4 mr-2" />
                    Get Support
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Download Statistics */}
            <Card>
              <CardHeader>
                <CardTitle>Download Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total Downloads</span>
                  <span className="font-medium">847,392</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">This Month</span>
                  <span className="font-medium">23,847</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Latest Version</span>
                  <span className="font-medium">156,239</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Next Steps */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>What&apos;s Next?</CardTitle>
            <CardDescription>
              After downloading AxylOS, follow these steps to get started
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">1. Verify Download</h3>
                <p className="text-sm text-muted-foreground">
                  Use the provided checksums to verify your download integrity
                </p>
              </div>
              
              <div className="text-center">
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <HardDrive className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">2. Create Boot Media</h3>
                <p className="text-sm text-muted-foreground">
                  Flash the ISO to a USB drive or burn to DVD
                </p>
              </div>
              
              <div className="text-center">
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Monitor className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">3. Install AxylOS</h3>
                <p className="text-sm text-muted-foreground">
                  Follow our step-by-step installation guide
                </p>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <Button asChild>
                <Link href="/docs/installation">
                  <FileText className="h-4 w-4 mr-2" />
                  View Installation Guide
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}