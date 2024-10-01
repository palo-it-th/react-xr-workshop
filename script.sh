#!/bin/bash

verify_tool() {
    local tool=$1
    local min_version=$2
    local verified_var=$3
    local message_var=$4
    local icon_var=$5

    if [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
        # Windows environment
        if powershell.exe -Command "Get-Command $tool" >/dev/null 2>&1; then
            if [ -n "$min_version" ]; then
                local tool_version
                tool_version=$(powershell.exe -Command "$tool -v" | cut -c 2-)
                if [ "$(printf '%s\n' "$min_version" "$tool_version" | sort -V | head -n1)" = "$min_version" ] && [ "$min_version" != "$tool_version" ]; then
                    eval "$verified_var=1"
                    eval "$message_var='$tool is installed and version is greater than or equal to $min_version'"
                    eval "$icon_var='✅'"
                else
                    eval "$verified_var=0"
                    eval "$message_var='$tool version is less than $min_version'"
                    eval "$icon_var='❌'"
                fi
            else
                eval "$verified_var=1"
                eval "$message_var='$tool is installed'"
                eval "$icon_var='✅'"
            fi
        else
            eval "$verified_var=0"
            eval "$message_var='$tool is not installed'"
            eval "$icon_var='❌'"
        fi
    else
        # macOS/Linux environment
        if command -v "$tool" >/dev/null; then
            if [ -n "$min_version" ]; then
                local tool_version
                tool_version=$("$tool" -v | cut -c 2-)
                if [ "$(printf '%s\n' "$min_version" "$tool_version" | sort -V | head -n1)" = "$min_version" ] && [ "$min_version" != "$tool_version" ]; then
                    eval "$verified_var=1"
                    eval "$message_var='$tool is installed and version is greater than or equal to $min_version'"
                    eval "$icon_var='✅'"
                else
                    eval "$verified_var=0"
                    eval "$message_var='$tool version is less than $min_version'"
                    eval "$icon_var='❌'"
                fi
            else
                eval "$verified_var=1"
                eval "$message_var='$tool is installed'"
                eval "$icon_var='✅'"
            fi
        else
            eval "$verified_var=0"
            eval "$message_var='$tool is not installed'"
            eval "$icon_var='❌'"
        fi
    fi
}

echo "Tools verification..."

verify_tool "node" "20.0" NODE_VERIFIED NODE_VERIFIED_MESSAGE NODE_ICON
verify_tool "gltfjsx" "" GLTFJSX_VERIFIED GLTFJSX_VERIFIED_MESSAGE GLTFJSX_ICON

echo "Tools verification completed"
echo "Node.js $NODE_ICON : $NODE_VERIFIED_MESSAGE"
echo "gltfjsx $GLTFJSX_ICON : $GLTFJSX_VERIFIED_MESSAGE"
