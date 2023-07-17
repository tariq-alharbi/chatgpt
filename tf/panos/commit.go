package main

import (
	"log"

	"github.com/PaloAltoNetworks/pango"
	"github.com/PaloAltoNetworks/pango/commit"
)

func main() {
	var err error
	var deviceGroup = "MyDeviceGroup"
	pan := pango.Firewall{Client: pango.Client{
		Hostname: "",
		Username: "",
		Password: "",
		Logging:  pango.LogAction | pango.LogOp,
	}}
	if err = pan.Initialize(); err != nil {
		log.Printf("Failed to initialize client: %s", err)
		return
	}
	log.Printf("Initialize ok")

	panCommit := commit.PanoramaCommit{
		Description:  "commit",
		Admins:       nil,
		DeviceGroups: []string{deviceGroup},
	}

	resp, bytes, err := pan.Commit(panCommit, "", nil)
	if err != nil {
		log.Panic(err)
	}
	log.Printf("Job ID: %v\n", resp)
	log.Printf("Response XML: %v\n", string(bytes))

}
