package main

// import "fmt"
	
import (
    "flag"
    "fmt"
    "os"
)
func main() {
    fmt.Println("Hello, World!")

    cmd := flag.NewFlagSet("foo", flag.ExitOnError)

	targetIndex := cmd.Int64("index", 101, "index")

	var pa []int

	pa = append(pa, 2, 3, 5, 7, 11)
	pa[len(pa)-1] // last element
	for i:=

}