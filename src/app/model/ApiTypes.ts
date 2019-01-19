export interface ApiBase {
  error: number;
  message: string;
}

export interface AvailableOS extends ApiBase {
  installed: string;
  templates: Array<string>;
}

export interface ServerInfo extends ApiBase {
  vm_type: string; // Hypervizor type (ovz or kvm)
  hostname: string; // Hostname of the VPS
  node_ip: string; // IP address of the physical node
  node_alias: string; // Internal nickname of the physical node
  node_location: string; // Physical location (country, state)
  location_ipv6_ready: boolean; // Whether IPv6 is supported at the current location
  plan: string; // Name of plan
  plan_disk: number; // Disk quota (bytes)
  plan_ram: number; // RAM (bytes)
  plan_swap: number; // SWAP (bytes)
  os: string; // Operating system
  email: string; // Primary e-mail address of the account
  plan_monthly_data: number; // Allowed monthly data transfer (bytes)
  data_counter: number; // Data transfer used in the current billing month.
  monthly_data_multiplier: number; // Some locations offer more expensive bandwidth
  data_next_reset: string; // Date and time of transfer counter reset (UNIX timestamp)
  ip_addresses: string; // IPv4 and IPv6 addresses assigned to VPS (Array)
  plan_max_ipv6s: number; // Maximum number of IPv6 addresses allowed by plan
  rdns_api_available: boolean; // Whether or not rDNS records can be set via API
  suspended: boolean; // Whether VPS is suspended
}

export interface OVZ extends ServerInfo {
  vz_status: Array<any>; // array containing OpenVZ beancounters, system load average, number of processes, open files, sockets, memory usage etc
  vz_quota: Array<any>; // array containing OpenVZ disk size, inodes and usage info
  is_cpu_throttled: number; // 0 = CPU is not throttled, 1 = CPU is throttled due to high usage.
  ssh_port: number; // SSH port of the VPS
}

export interface KVM extends ServerInfo {
  ve_status: string; // Running or Stopped
  ve_mac1: string; // MAC address of primary network interface
  ve_used_disk_space_b: number; // Occupied (mapped) disk space in bytes
  ve_disk_quota_gb: number; // Actual size of disk image in GB
  is_cpu_throttled: number; // 0 = CPU is not throttled, 1 = CPU is throttled due to high usage
  ssh_port: number; // SSH port of the VPS (returned only if VPS is running)
  live_hostname: string; // Result of "hostname" command executed inside VPS
  load_average: string; // Raw load average string
  mem_available_kb: number; // Amount of available RAM in KB
  swap_total_kb: number; // Total amount of Swap in KB
  swap_available_kb: number; // Amount of available Swap in KB
}

export interface RateLimit extends ApiBase {
  remaining_points_15min: number; // Number of "points" available to use in the current 15-minute interval
  remaining_points_24h: number; // Number of "points" available to use in the current 24-hour interval
}

export interface ResetPwdResult extends ApiBase {
  password: string;
}

export interface UsageItem {
  cpu_usage: number;
  disk_read_bytes: number;
  disk_write_bytes: number;
  network_in_bytes: number;
  network_out_bytes: number;
  timestamp: number;
}

export interface VpsUsageRaw extends ApiBase {
  data: Array<UsageItem>;
  vm_type: string;
}


export interface DataCenterList {
  currentLocation: string; // ID of current location
  locations: Array<string>; // IDs of locations available for migration into
  descriptions: { [dcName: string]: string }; // Friendly descriptions of available locations
  dataTransferMultipliers: { [dcName: string]: number };
}

export interface Dc {
  dataTransferMultiplier: number;
  locations: string;
  desc: string;
}
