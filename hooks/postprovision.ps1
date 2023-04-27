$env:Path = "../.azure/react-toolkit/.env"

git clone git@github.com:MicrosoftCSA/react-component-toolkit.git 

Set-Location ./react-component-toolkit

git checkout dev

node install.mjs

$continue = $true  
  
while ($continue) {  
    $description = Read-Host "Enter a description for the new React component"  
    node createnew.mjs "$($description)"  
  
    $test = Read-Host "Would you like to test the component? (y/N)"  
    if ($test -eq "y") 
    {  
        npm run ladle:dev  
    }  
  
    $package = Read-Host "Would you like to package the component as an Azure API Management developer portal widget and test it? (y/N)"  
    if ($package -eq "y") 
    {  
        $components = Get-ChildItem "./src/components" -Directory | Where-Object { $_.Name -notin @("bingmaps", "common", "footer", "graphikle", "markdownviewer", "index.ts", "signin", "styledtext") }  
        if ($components.Count -eq 0) 
        {  
            Write-Host "No components found."  
        } 
        else 
        {  
            Write-Host "Components: $($components.Name -join ', ')"  
            $componentName = Read-Host "Enter the name of the component to publish to Azure API Management"  

            if ($components.Name -contains $componentName) {  
                if (Test-Path "./src/components/$componentName") {  
                    node packagewidget.mjs "$($componentName)"  
                } else {  
                    Write-Host "Component directory does not exist."  
                    Continue  
                }  
            } else {  
                Write-Host "Invalid component name."  
                Continue  
            }  
            
        }  
    }  
  
    $continue = Read-Host "Do you want to create another component? (y/N)"  
    if ($continue -ne "y") {  
        $continue = $false  
    }  
}  

