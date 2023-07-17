terraform {
  required_providers {
    panos = {
        source = "PaloAltoNetworks/panos"
    }
  }
}

provider "panos" {
    hostname = ""
    username = ""
    password = ""
}



resource "panos_zone" "public" {
    name = "public"
    mode = "layer3"
    interfaces = [
        panos_ethernet_interface.eth1.name,

        
    ]

    lifecycle {
        create_before_destroy = true
    }
}

resource "panos_zone" "dmz" {
    name = "dmz"
    mode = "layer3"

        interfaces = [
        panos_ethernet_interface.eth2.name,
        
    ]

    lifecycle {
        create_before_destroy = true
    }
}





resource "panos_ethernet_interface" "eth1" {
    name = "ethernet1/1"
    vsys = "vsys1"
    mode = "layer3"
static_ips = ["192.168.192.20/24"]

    lifecycle {
        create_before_destroy = true
    }
}
resource "panos_ethernet_interface" "eth2" {
    name = "ethernet1/2"
    vsys = "vsys1"
    mode = "layer3"
static_ips = ["192.168.224.20/24"]

    lifecycle {
        create_before_destroy = true
    }
}


resource "panos_virtual_router" "VR" {
    name = "VR"
    static_dist = 15
    interfaces = [
        panos_ethernet_interface.eth1.name,
        panos_ethernet_interface.eth2.name,
    ]

    lifecycle {
        create_before_destroy = true
    }
}

resource "panos_static_route_ipv4" "web" {
    name = "web"
    virtual_router = panos_virtual_router.VR.name
    //dmz subnet 
    destination = "192.168.224.0/19"
    
    
    interface= panos_ethernet_interface.eth2.name
    //dmz gateWay 
    next_hop = "192.168.224.253/32"

    lifecycle {
        create_before_destroy = true
    }
}
resource "panos_static_route_ipv4" "int" {
    name = "int"
    virtual_router = panos_virtual_router.VR.name
    destination = "0.0.0.0/0"
    
    interface= panos_ethernet_interface.eth1.name
    //public gateway 
    next_hop = "192.168.223.253"

    lifecycle {
        create_before_destroy = true
    }
}



resource "panos_security_policy" "web" {
    rule {
        name = "web"
        audit_comment = "Initial config"
        source_zones = [panos_zone.public.name]
        source_addresses = ["any"]
        source_users = ["any"]
        destination_zones = [panos_zone.dmz.name]
        //public eni privete ip addr
        destination_addresses = ["192.168.192.20"]
        applications = ["web-browsing"]
        services = ["application-default"]
        categories = ["any"]
        action = "allow"
    }

    lifecycle {
        create_before_destroy = true
    }
}








resource "panos_nat_rule_group" "web" {
    rule {
        name = "first"
        audit_comment = "Initial config"
        original_packet {
            source_zones = [panos_zone.public.name]
            destination_zone = panos_zone.public.name
            destination_interface ="any"
            source_addresses = ["any"]
            //public eni private ip addr
            destination_addresses = ["192.168.192.20"]
        }
        translated_packet {
            source {}
            destination {
                static_translation {
                    //web private ip addr
                    address = "192.168.227.229"
                }
            }
        }
    }
    

    lifecycle {
        create_before_destroy = true
    }
}












